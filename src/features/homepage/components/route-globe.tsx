"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils/cn";

export interface GlobePoint {
  /** Country name (screen-reader text). */
  label: string;
  /** ISO code, used as a stable key. */
  code: string;
  /** City drawn on the label when the route is highlighted. */
  city: string;
  lat: number;
  lng: number;
}

interface RouteGlobeProps {
  origin: GlobePoint;
  destinations: GlobePoint[];
  className?: string;
}

type Vec3 = [number, number, number];

const DEG = Math.PI / 180;
/** View centre between Lisbon and Singapore, so every route sits on the visible face. */
const CENTER_LNG = 52;
const CENTER_LAT = 24;
const SWAY = 7;
const CYCLE_MS = 3600;

function toVec(lat: number, lng: number): Vec3 {
  return [Math.cos(lat * DEG) * Math.cos(lng * DEG), Math.cos(lat * DEG) * Math.sin(lng * DEG), Math.sin(lat * DEG)];
}


/** Great-circle path from a to b, lifted off the surface in proportion to its length. */
function arcPath(a: Vec3, b: Vec3, steps = 72): Vec3[] {
  const dot = Math.min(1, Math.max(-1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]));
  const omega = Math.acos(dot);
  const sinO = Math.sin(omega) || 1;
  const lift = 0.04 + omega * 0.12;
  const out: Vec3[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const ka = Math.sin((1 - t) * omega) / sinO;
    const kb = Math.sin(t * omega) / sinO;
    const r = 1 + lift * Math.sin(Math.PI * t);
    out.push([(a[0] * ka + b[0] * kb) * r, (a[1] * ka + b[1] * kb) * r, (a[2] * ka + b[2] * kb) * r]);
  }
  return out;
}

/** Graticule rings (every 30°) as point lists, drawn faintly for structure. */
function graticule(): Vec3[][] {
  const lines: Vec3[][] = [];
  for (let lat = -60; lat <= 60; lat += 30) {
    const ring: Vec3[] = [];
    for (let lng = -180; lng <= 180; lng += 4) ring.push(toVec(lat, lng));
    lines.push(ring);
  }
  for (let lng = -180; lng < 180; lng += 30) {
    const ring: Vec3[] = [];
    for (let lat = -84; lat <= 84; lat += 4) ring.push(toVec(lat, lng));
    lines.push(ring);
  }
  return lines;
}

/**
 * Dotted globe (real coastlines, 1:50m) with routes from Bangladesh.
 * One route is highlighted at a time: it draws in, a light travels along it,
 * and its city is labelled. Orthographic projection on a 2D canvas: no
 * WebGL, pauses off-screen, static for reduced motion.
 */
export function RouteGlobe({ origin, destinations, className }: RouteGlobeProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const switchedAt = useRef(0);
  /** Lets route changes repaint when the loop isn't running (reduced motion, off-screen). */
  const redrawRef = useRef<(() => void) | null>(null);

  // Cycle the highlighted route (static for reduced motion).
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % destinations.length), CYCLE_MS);
    return () => window.clearInterval(id);
  }, [destinations.length]);

  useEffect(() => {
    activeRef.current = active;
    switchedAt.current = performance.now();
    redrawRef.current?.();
  }, [active]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const grid = graticule();
    let land: Vec3[] = [];
    let width = 0;
    let frame = 0;
    let running = false;
    let visible = true;
    const start = performance.now();

    let dragOffset = 0;
    let dragVelocity = 0;
    let dragging = false;
    let lastX = 0;

    // Pre-rendered soft dot: far cheaper than arc() for thousands of points.
    const sprite = document.createElement("canvas");
    const S = Math.ceil(4 * dpr);
    sprite.width = sprite.height = S;
    const sctx = sprite.getContext("2d")!;
    const g = sctx.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
    g.addColorStop(0, "rgba(191,219,254,1)");
    g.addColorStop(0.55, "rgba(147,197,253,0.9)");
    g.addColorStop(1, "rgba(147,197,253,0)");
    sctx.fillStyle = g;
    sctx.fillRect(0, 0, S, S);

    const originVec = toVec(origin.lat, origin.lng);
    const routes = destinations.map((d) => ({ vec: toVec(d.lat, d.lng), path: arcPath(originVec, toVec(d.lat, d.lng)) }));

    function resize() {
      width = wrap!.clientWidth;
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(width * dpr);
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${width}px`;
      if (!running) draw(performance.now());
    }

    /** Label pill beside an anchor; flips to the left if it would leave the canvas. */
    function pill(text: string, ax: number, y: number, emphasis: boolean, gap: number) {
      ctx!.font = `600 ${11 * dpr}px ui-sans-serif, system-ui, sans-serif`;
      const w = ctx!.measureText(text).width + 14 * dpr;
      const h = 20 * dpr;
      const x = ax + gap + w > width * dpr - 6 * dpr ? ax - gap - w : ax + gap;
      ctx!.fillStyle = emphasis ? "rgba(255,255,255,0.95)" : "rgba(7,29,53,0.75)";
      ctx!.strokeStyle = emphasis ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.25)";
      ctx!.lineWidth = 1 * dpr;
      ctx!.beginPath();
      ctx!.roundRect(x, y - h / 2, w, h, h / 2);
      ctx!.fill();
      ctx!.stroke();
      ctx!.fillStyle = emphasis ? "#102a43" : "#ffffff";
      ctx!.textAlign = "left";
      ctx!.textBaseline = "middle";
      ctx!.fillText(text, x + 7 * dpr, y + 0.5 * dpr);
    }

    function draw(now: number) {
      const t = Math.max(0, (now - start) / 1000);
      const size = width * dpr;
      // Halo stays inside the canvas (R × 1.22 < size / 2), so no square edge.
      const R = size * 0.4;
      const cx = size / 2;
      const cy = size / 2;
      const lng0 = (CENTER_LNG + (reduced ? 0 : Math.sin(t * 0.1) * SWAY) + dragOffset) * DEG;
      const lat0 = CENTER_LAT * DEG;
      const cosL = Math.cos(-lng0);
      const sinL = Math.sin(-lng0);
      const cosP = Math.cos(lat0);
      const sinP = Math.sin(lat0);

      const project = (v: Vec3): [number, number, number] => {
        const x1 = v[0] * cosL - v[1] * sinL;
        const y1 = v[0] * sinL + v[1] * cosL;
        const x2 = x1 * cosP + v[2] * sinP;
        const z2 = -x1 * sinP + v[2] * cosP;
        return [cx + y1 * R, cy - z2 * R, x2];
      };

      ctx!.clearRect(0, 0, size, size);

      // Atmosphere.
      const halo = ctx!.createRadialGradient(cx, cy, R * 0.92, cx, cy, R * 1.22);
      halo.addColorStop(0, "rgba(59,130,246,0.35)");
      halo.addColorStop(0.45, "rgba(59,130,246,0.1)");
      halo.addColorStop(1, "rgba(59,130,246,0)");
      ctx!.fillStyle = halo;
      ctx!.beginPath();
      ctx!.arc(cx, cy, R * 1.22, 0, Math.PI * 2);
      ctx!.fill();

      // Sphere, lit from the upper left.
      const body = ctx!.createRadialGradient(cx - R * 0.4, cy - R * 0.45, R * 0.05, cx, cy, R);
      body.addColorStop(0, "#1b4a7d");
      body.addColorStop(0.55, "#0d2c50");
      body.addColorStop(1, "#06182d");
      ctx!.fillStyle = body;
      ctx!.beginPath();
      ctx!.arc(cx, cy, R, 0, Math.PI * 2);
      ctx!.fill();

      // Graticule.
      ctx!.strokeStyle = "rgba(147,197,253,0.07)";
      ctx!.lineWidth = 1 * dpr;
      for (const ring of grid) {
        ctx!.beginPath();
        let pen = false;
        for (const v of ring) {
          const [x, y, d] = project(v);
          if (d <= 0) {
            pen = false;
            continue;
          }
          if (pen) ctx!.lineTo(x, y);
          else ctx!.moveTo(x, y);
          pen = true;
        }
        ctx!.stroke();
      }

      // Land, brighter toward the viewer and slightly larger at the centre.
      for (const v of land) {
        const [x, y, d] = project(v);
        if (d <= 0.04) continue;
        const s = S * (0.55 + d * 0.45);
        ctx!.globalAlpha = 0.12 + d * 0.75;
        ctx!.drawImage(sprite, x - s / 2, y - s / 2, s, s);
      }
      ctx!.globalAlpha = 1;

      // Rim light.
      const rim = ctx!.createLinearGradient(cx - R, cy - R, cx + R, cy + R);
      rim.addColorStop(0, "rgba(191,219,254,0.55)");
      rim.addColorStop(0.5, "rgba(147,197,253,0.12)");
      rim.addColorStop(1, "rgba(147,197,253,0.3)");
      ctx!.strokeStyle = rim;
      ctx!.lineWidth = 1.2 * dpr;
      ctx!.beginPath();
      ctx!.arc(cx, cy, R, 0, Math.PI * 2);
      ctx!.stroke();

      const activeIndex = activeRef.current;
      const sinceSwitch = reduced ? 99 : (now - switchedAt.current) / 1000;

      // Quiet routes first, the highlighted one on top.
      const order = routes.map((_, i) => i).filter((i) => i !== activeIndex);
      order.push(activeIndex);
      for (const i of order) {
        const route = routes[i];
        const isActive = i === activeIndex;
        const pts = route.path.map(project);
        const progress = isActive ? Math.min(1, sinceSwitch / 1.1) : 1;
        const eased = 1 - Math.pow(1 - progress, 3);
        const last = Math.max(1, Math.floor(eased * (pts.length - 1)));

        ctx!.lineCap = "round";
        for (let k = 1; k <= last; k++) {
          const [x0, y0, d0] = pts[k - 1];
          const [x1, y1, d1] = pts[k];
          if (d0 < -0.1 && d1 < -0.1) continue;
          if (isActive) {
            // Emerald at home, brand blue at the destination.
            const f = k / (pts.length - 1);
            ctx!.strokeStyle = `rgba(${Math.round(16 + 80 * f)},${Math.round(185 - 20 * f)},${Math.round(129 + 121 * f)},0.95)`;
            ctx!.lineWidth = 2.4 * dpr;
          } else {
            ctx!.strokeStyle = "rgba(147,197,253,0.22)";
            ctx!.lineWidth = 1 * dpr;
          }
          ctx!.beginPath();
          ctx!.moveTo(x0, y0);
          ctx!.lineTo(x1, y1);
          ctx!.stroke();
        }

        // Travelling light on the highlighted route.
        if (isActive && progress >= 1 && !reduced) {
          const phase = ((sinceSwitch - 1.1) * 0.55) % 1;
          const head = Math.floor(phase * (pts.length - 1));
          for (let k = 0; k < 10; k++) {
            const p = pts[head - k];
            if (!p || p[2] < 0) continue;
            ctx!.globalAlpha = (1 - k / 10) * 0.95;
            ctx!.fillStyle = "#ffffff";
            ctx!.beginPath();
            ctx!.arc(p[0], p[1], (2.4 - k * 0.18) * dpr, 0, Math.PI * 2);
            ctx!.fill();
          }
          ctx!.globalAlpha = 1;
        }

        // Marker.
        const [mx, my, md] = project(route.vec);
        if (md <= 0) continue;
        if (isActive) {
          if (progress >= 1) {
            const ring = reduced ? 0.5 : (sinceSwitch * 0.8) % 1;
            ctx!.strokeStyle = `rgba(96,165,250,${1 - ring})`;
            ctx!.lineWidth = 1.5 * dpr;
            ctx!.beginPath();
            ctx!.arc(mx, my, (4 + ring * 14) * dpr, 0, Math.PI * 2);
            ctx!.stroke();
            pill(destinations[i].city, mx, my - 14 * dpr, true, 10 * dpr);
          }
          ctx!.fillStyle = "#3b82f6";
          ctx!.beginPath();
          ctx!.arc(mx, my, 4.2 * dpr, 0, Math.PI * 2);
          ctx!.fill();
          ctx!.strokeStyle = "#ffffff";
          ctx!.lineWidth = 1.6 * dpr;
          ctx!.stroke();
        } else {
          ctx!.fillStyle = "rgba(147,197,253,0.75)";
          ctx!.beginPath();
          ctx!.arc(mx, my, 2.4 * dpr, 0, Math.PI * 2);
          ctx!.fill();
        }
      }

      // Origin: Dhaka.
      const [ox, oy] = project(originVec);
      const pulse = reduced ? 0.5 : (t * 0.55) % 1;
      ctx!.strokeStyle = `rgba(16,185,129,${0.9 * (1 - pulse)})`;
      ctx!.lineWidth = 1.5 * dpr;
      ctx!.beginPath();
      ctx!.arc(ox, oy, (5 + pulse * 18) * dpr, 0, Math.PI * 2);
      ctx!.stroke();
      ctx!.fillStyle = "#10b981";
      ctx!.beginPath();
      ctx!.arc(ox, oy, 5 * dpr, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.strokeStyle = "#ffffff";
      ctx!.lineWidth = 1.8 * dpr;
      ctx!.stroke();
      pill(origin.city, ox, oy - 16 * dpr, false, 11 * dpr);
    }

    function loop(now: number) {
      if (!dragging) {
        dragOffset += dragVelocity;
        dragVelocity *= 0.94;
        dragOffset *= 0.985;
      }
      draw(now);
      frame = requestAnimationFrame(loop);
    }
    function startLoop() {
      if (running || reduced || !visible || document.hidden) return;
      running = true;
      frame = requestAnimationFrame(loop);
    }
    function stopLoop() {
      running = false;
      cancelAnimationFrame(frame);
    }

    function onDown(e: PointerEvent) {
      dragging = true;
      lastX = e.clientX;
      canvas!.setPointerCapture(e.pointerId);
    }
    function onMove(e: PointerEvent) {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      const deg = (dx / width) * 120;
      dragOffset -= deg;
      dragVelocity = -deg * 0.5;
      if (!running) draw(performance.now());
    }
    function onUp() {
      dragging = false;
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) startLoop();
      else stopLoop();
    });
    const ro = new ResizeObserver(resize);
    const onVisibility = () => (document.hidden ? stopLoop() : startLoop());
    redrawRef.current = () => {
      if (!running) draw(performance.now());
    };

    let cancelled = false;
    fetch("/data/globe-land.json")
      .then((r) => r.json() as Promise<number[]>)
      .then((flat) => {
        if (cancelled) return;
        const pts: Vec3[] = [];
        for (let i = 0; i < flat.length; i += 2) pts.push(toVec(flat[i], flat[i + 1]));
        land = pts;
        if (!running) draw(performance.now());
      })
      .catch(() => {
        /* The globe still renders routes without land. */
      });

    ro.observe(wrap);
    io.observe(wrap);
    document.addEventListener("visibilitychange", onVisibility);
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    resize();
    startLoop();

    return () => {
      cancelled = true;
      redrawRef.current = null;
      stopLoop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
    };
  }, [origin, destinations]);

  return (
    <div className={cn("relative", className)}>
      <div ref={wrapRef} className="relative aspect-square w-full">
        <canvas ref={canvasRef} aria-hidden className="absolute inset-0 cursor-grab touch-pan-y active:cursor-grabbing" />
      </div>
    </div>
  );
}
