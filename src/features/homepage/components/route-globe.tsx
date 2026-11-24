"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils/cn";

export interface GlobePoint {
  label: string;
  /** Short code drawn next to the marker. */
  code: string;
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
/** View centre sits between Lisbon and Singapore so every route is on the visible face. */
const CENTER_LNG = 52;
const CENTER_LAT = 26;
/** Idle sway (degrees) instead of a full spin, so routes never rotate out of view. */
const SWAY = 16;
/** Label placement for markers that sit close together (Gulf states). */
const LABEL_SIDE: Record<string, [number, number]> = {
  SA: [-1, 0.2],
  QA: [1, -0.9],
  AE: [1, 0.9],
  MY: [-1, 0.4],
  SG: [1, 0.8],
  PT: [-1, 0.2],
  IT: [0, 1.6],
  RO: [1, -0.7],
};

function toVec(lat: number, lng: number): Vec3 {
  return [Math.cos(lat * DEG) * Math.cos(lng * DEG), Math.cos(lat * DEG) * Math.sin(lng * DEG), Math.sin(lat * DEG)];
}

/** Great-circle path from a to b, lifted off the surface into an arc. */
function arcPath(a: Vec3, b: Vec3, steps = 64): Vec3[] {
  const dot = Math.min(1, Math.max(-1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]));
  const omega = Math.acos(dot);
  const sinO = Math.sin(omega) || 1;
  const lift = 0.06 + omega * 0.16;
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

/**
 * Dotted globe with animated routes from Bangladesh to each destination.
 * Real orthographic projection on a 2D canvas: no WebGL context, no 3D library,
 * pauses off-screen, draws one static frame for reduced motion.
 */
export function RouteGlobe({ origin, destinations, className }: RouteGlobeProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let land: Vec3[] = [];
    let width = 0;
    let frame = 0;
    let running = false;
    let visible = true;
    const start = performance.now();

    // Drag-to-turn state (degrees added to the idle sway).
    let dragOffset = 0;
    let dragVelocity = 0;
    let dragging = false;
    let lastX = 0;

    const originVec = toVec(origin.lat, origin.lng);
    const routes = destinations.map((d, i) => ({
      point: d,
      vec: toVec(d.lat, d.lng),
      path: arcPath(originVec, toVec(d.lat, d.lng)),
      delay: 0.25 + i * 0.12,
      speed: 0.16 + (i % 3) * 0.03,
    }));

    function resize() {
      width = wrap!.clientWidth;
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(width * dpr);
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${width}px`;
      if (!running) draw(performance.now());
    }

    function draw(now: number) {
      // rAF timestamps can precede `start` by a frame; clamp so radii never go negative.
      const t = Math.max(0, (now - start) / 1000);
      const size = width * dpr;
      const R = size * 0.44;
      const cx = size / 2;
      const cy = size / 2;
      const lng0 = (CENTER_LNG + (reduced ? 0 : Math.sin(t * 0.12) * SWAY) + dragOffset) * DEG;
      const lat0 = CENTER_LAT * DEG;
      const cosL = Math.cos(-lng0);
      const sinL = Math.sin(-lng0);
      const cosP = Math.cos(lat0);
      const sinP = Math.sin(lat0);

      // Returns [screenX, screenY, depth]; depth > 0 faces the viewer.
      const project = (v: Vec3): [number, number, number] => {
        const x1 = v[0] * cosL - v[1] * sinL;
        const y1 = v[0] * sinL + v[1] * cosL;
        const x2 = x1 * cosP + v[2] * sinP;
        const z2 = -x1 * sinP + v[2] * cosP;
        return [cx + y1 * R, cy - z2 * R, x2];
      };

      ctx!.clearRect(0, 0, size, size);

      // Atmosphere + sphere body.
      const halo = ctx!.createRadialGradient(cx, cy, R * 0.9, cx, cy, R * 1.25);
      halo.addColorStop(0, "rgba(59,130,246,0.28)");
      halo.addColorStop(1, "rgba(59,130,246,0)");
      ctx!.fillStyle = halo;
      ctx!.beginPath();
      ctx!.arc(cx, cy, R * 1.25, 0, Math.PI * 2);
      ctx!.fill();

      const body = ctx!.createRadialGradient(cx - R * 0.35, cy - R * 0.45, R * 0.1, cx, cy, R);
      body.addColorStop(0, "#17406b");
      body.addColorStop(0.65, "#0b2748");
      body.addColorStop(1, "#071d35");
      ctx!.fillStyle = body;
      ctx!.beginPath();
      ctx!.arc(cx, cy, R, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.strokeStyle = "rgba(147,197,253,0.35)";
      ctx!.lineWidth = 1 * dpr;
      ctx!.stroke();

      // Land dots, brighter toward the viewer.
      const dot = 1.15 * dpr;
      for (const v of land) {
        const [sx, sy, depth] = project(v);
        if (depth <= 0.02) continue;
        ctx!.globalAlpha = 0.18 + depth * 0.62;
        ctx!.fillStyle = "#bfdbfe";
        ctx!.fillRect(sx - dot / 2, sy - dot / 2, dot, dot);
      }
      ctx!.globalAlpha = 1;

      // Routes.
      for (const route of routes) {
        const progress = reduced ? 1 : Math.min(1, Math.max(0, (t - route.delay) / 1.4));
        if (progress <= 0) continue;
        const pts = route.path.map(project);
        const last = Math.floor(progress * (pts.length - 1));

        ctx!.lineWidth = 1.4 * dpr;
        ctx!.lineCap = "round";
        for (let i = 1; i <= last; i++) {
          const [x0, y0, d0] = pts[i - 1];
          const [x1, y1, d1] = pts[i];
          if (d0 < -0.15 && d1 < -0.15) continue;
          ctx!.strokeStyle = `rgba(96,165,250,${d1 > 0 ? 0.75 : 0.25})`;
          ctx!.beginPath();
          ctx!.moveTo(x0, y0);
          ctx!.lineTo(x1, y1);
          ctx!.stroke();
        }

        // Travelling pulse once the route has drawn in.
        if (!reduced && progress >= 1) {
          const phase = ((t - route.delay) * route.speed) % 1;
          const head = Math.floor(phase * (pts.length - 1));
          for (let k = 0; k < 8; k++) {
            const p = pts[head - k];
            if (!p || p[2] < 0) continue;
            ctx!.globalAlpha = (1 - k / 8) * 0.9;
            ctx!.fillStyle = "#ffffff";
            ctx!.beginPath();
            ctx!.arc(p[0], p[1], (2.2 - k * 0.2) * dpr, 0, Math.PI * 2);
            ctx!.fill();
          }
          ctx!.globalAlpha = 1;
        }

        // Destination marker + label.
        const [mx, my, md] = project(route.vec);
        if (md > 0 && progress >= 1) {
          ctx!.fillStyle = "#3b82f6";
          ctx!.beginPath();
          ctx!.arc(mx, my, 3.4 * dpr, 0, Math.PI * 2);
          ctx!.fill();
          ctx!.strokeStyle = "#ffffff";
          ctx!.lineWidth = 1.2 * dpr;
          ctx!.stroke();

          const [sideX, sideY] = LABEL_SIDE[route.point.code] ?? [1, 0];
          ctx!.font = `600 ${10.5 * dpr}px ui-sans-serif, system-ui, sans-serif`;
          ctx!.textAlign = sideX < 0 ? "right" : sideX > 0 ? "left" : "center";
          ctx!.textBaseline = "middle";
          ctx!.fillStyle = "rgba(255,255,255,0.85)";
          ctx!.fillText(route.point.label, mx + sideX * 8 * dpr, my + sideY * 9 * dpr);
        }
      }

      // Origin: Bangladesh, with a slow emerald pulse.
      const [ox, oy] = project(originVec);
      const pulse = reduced ? 0.5 : (t * 0.6) % 1;
      ctx!.strokeStyle = `rgba(16,185,129,${1 - pulse})`;
      ctx!.lineWidth = 1.5 * dpr;
      ctx!.beginPath();
      ctx!.arc(ox, oy, (5 + pulse * 16) * dpr, 0, Math.PI * 2);
      ctx!.stroke();
      ctx!.fillStyle = "#10b981";
      ctx!.beginPath();
      ctx!.arc(ox, oy, 4.6 * dpr, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.strokeStyle = "#ffffff";
      ctx!.lineWidth = 1.6 * dpr;
      ctx!.stroke();
      ctx!.font = `700 ${11.5 * dpr}px ui-sans-serif, system-ui, sans-serif`;
      ctx!.textAlign = "left";
      ctx!.fillStyle = "#ffffff";
      ctx!.fillText(origin.label, ox + 10 * dpr, oy + 12 * dpr);
    }

    function loop(now: number) {
      if (!dragging) {
        dragOffset += dragVelocity;
        dragVelocity *= 0.94;
        // Ease back toward the composed view.
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

    // Pointer drag (horizontal only, so vertical page scrolling still works on touch).
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
        /* Globe still renders routes without land dots. */
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
    <div ref={wrapRef} className={cn("relative aspect-square w-full", className)}>
      <canvas ref={canvasRef} aria-hidden className="absolute inset-0 cursor-grab touch-pan-y active:cursor-grabbing" />
    </div>
  );
}
