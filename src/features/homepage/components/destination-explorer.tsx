"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUpRight, Building2, Coins, Plane, Route, Search } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { gsap } from "@/components/animations";
import { routes } from "@/lib/constants/routes";
import { cn } from "@/lib/utils/cn";
import type { DestinationRow } from "../types/homepage";

const AUTOPLAY_MS = 6000;
const km = new Intl.NumberFormat("en-GB");

/**
 * Pick a destination from the list (or let it cycle on its own) and the
 * feature card re-stages itself: the flag tints the light, a flight path
 * draws from Dhaka, and the details rise in.
 */
interface DestinationExplorerProps {
  destinations: DestinationRow[];
  /**
   * Server-rendered flag artwork keyed by ISO code (each fills its container).
   * Passed in so this client component never imports a feature barrel that
   * also exports server-only services.
   */
  flags: Record<string, ReactNode>;
}

/** Sized slot for a server-rendered flag. */
function Flag({ flags, code, className }: { flags: Record<string, ReactNode>; code: string; className?: string }) {
  return <span className={cn("block shrink-0", className)}>{flags[code]}</span>;
}

export function DestinationExplorer({ destinations, flags }: DestinationExplorerProps) {
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLUListElement>(null);
  const current = destinations[active];

  // Only cycle while visible, unpaused and before the visitor takes over.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  const cycling = autoplay && inView && !paused && !reduced;

  useEffect(() => {
    if (!cycling) return;
    const id = window.setTimeout(() => setActive((i) => (i + 1) % destinations.length), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [cycling, active, destinations.length]);

  // Re-stage the card on every change.
  useEffect(() => {
    const card = cardRef.current;
    if (!card || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo("[data-reveal]", { y: 22, autoAlpha: 0, filter: "blur(6px)" }, { y: 0, autoAlpha: 1, filter: "blur(0px)", duration: 0.8, stagger: 0.06, ease: "expo.out", clearProps: "filter" });
      gsap.fromTo("[data-flag]", { scale: 0.7, rotate: -8, autoAlpha: 0 }, { scale: 1, rotate: 0, autoAlpha: 1, duration: 0.9, ease: "back.out(1.6)" });
      gsap.fromTo("[data-glow]", { autoAlpha: 0, scale: 1.3 }, { autoAlpha: 1, scale: 1.6, duration: 1.4, ease: "power2.out" });
      gsap.fromTo("[data-route]", { strokeDashoffset: 420 }, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut" });
    }, card);
    return () => ctx.revert();
  }, [active]);

  // Keep the active chip centred on the mobile rail (horizontal only, never moves the page).
  useEffect(() => {
    const rail = railRef.current;
    const chip = rail?.children[active] as HTMLElement | undefined;
    if (!rail || !chip || rail.scrollWidth <= rail.clientWidth) return;
    rail.scrollTo({ left: chip.offsetLeft - rail.clientWidth / 2 + chip.clientWidth / 2, behavior: "smooth" });
  }, [active]);

  function choose(index: number) {
    setAutoplay(false);
    setActive(index);
  }

  return (
    <div
      ref={rootRef}
      className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Country picker: rail on phones, list on desktop */}
      <ul
        ref={railRef}
        role="tablist"
        aria-label="Destination countries"
        className="relative -mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:col-span-5 lg:mx-0 lg:flex-col lg:gap-1.5 lg:overflow-visible lg:px-0"
      >
        {destinations.map((country, i) => {
          const isActive = i === active;
          return (
            <li key={country.slug} className="shrink-0 snap-center lg:shrink">
              <button
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="destination-panel"
                onClick={() => choose(i)}
                className={cn(
                  "group relative flex w-full items-center gap-3 overflow-hidden rounded-2xl px-3.5 py-2.5 text-left transition-all duration-500 lg:gap-4 lg:rounded-3xl lg:px-4 lg:py-3.5",
                  isActive ? "bg-card shadow-float ring-1 ring-border/70" : "ring-1 ring-border/60 hover:bg-card/70 lg:ring-0",
                )}
              >
                <Flag flags={flags} code={country.isoCode} className={cn("w-8 transition-transform duration-500 lg:w-11", isActive ? "scale-110" : "group-hover:scale-105")} />
                <span className="min-w-0 flex-1">
                  <span className={cn("block whitespace-nowrap text-sm font-semibold transition-colors lg:text-base", isActive ? "text-navy" : "text-navy/60")}>
                    {country.name}
                  </span>
                  <span className="hidden text-xs text-muted-foreground lg:block">
                    {country.region} · {km.format(country.distanceKm)} km from Dhaka
                  </span>
                </span>
                <ArrowUpRight
                  aria-hidden
                  className={cn("hidden size-4 shrink-0 transition-all duration-500 lg:block", isActive ? "rotate-45 text-primary" : "text-navy/20 group-hover:text-navy/50")}
                />
                {/* Autoplay progress */}
                {isActive && autoplay && !reduced && (
                  <span
                    key={`${active}-${paused}-${inView}`}
                    aria-hidden
                    style={{ animationDuration: `${AUTOPLAY_MS}ms`, animationPlayState: cycling ? "running" : "paused" }}
                    className="absolute inset-x-0 bottom-0 h-0.5 origin-left animate-[grow-x_linear_forwards] bg-primary"
                  />
                )}
              </button>
            </li>
          );
        })}
      </ul>

      {/* Feature card */}
      <div
        id="destination-panel"
        role="tabpanel"
        aria-live="polite"
        ref={cardRef}
        className="relative isolate overflow-hidden rounded-[2rem] bg-navy-deep p-6 text-white shadow-[0_40px_80px_-30px_rgb(7_29_53/0.6)] sm:p-9 lg:col-span-7 lg:rounded-[2.5rem] lg:p-11"
      >
        {/* The flag itself, blurred huge, tints the card in the country's colours. */}
        <div data-glow aria-hidden className="absolute -right-24 -top-24 -z-10 w-[34rem] opacity-60 blur-[90px]">
          <Flag flags={flags} code={current.isoCode} className="w-full" />
        </div>
        <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-t from-navy-deep via-navy-deep/80 to-navy-deep/30" />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-[0.06] [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:18px_18px]"
        />

        <div className="flex items-start justify-between gap-4">
          <div data-flag className="rounded-xl bg-white/10 p-1.5 shadow-2xl ring-1 ring-white/20 backdrop-blur">
            <Flag flags={flags} code={current.isoCode} className="w-20 sm:w-24" />
          </div>
          <span data-reveal className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80 ring-1 ring-white/15 backdrop-blur">
            {current.region}
          </span>
        </div>

        <h3 data-reveal className="type-display mt-7 text-[2.6rem] sm:text-6xl lg:text-7xl">
          {current.name}
        </h3>
        <p data-reveal className="mt-3 max-w-lg text-base leading-7 text-white/70">
          {current.summary}
        </p>

        {/* Flight path from Dhaka */}
        <div data-reveal className="mt-7 rounded-2xl bg-white/[0.06] p-4 ring-1 ring-white/10 sm:p-5">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="flex items-center gap-2">
              <Flag flags={flags} code="BD" className="w-5" />
              Dhaka
            </span>
            <span className="flex items-center gap-1.5 text-white/60">
              <Route aria-hidden className="size-3.5" />
              {km.format(current.distanceKm)} km
            </span>
            <span className="flex items-center gap-2">
              {current.capital}
              <Flag flags={flags} code={current.isoCode} className="w-5" />
            </span>
          </div>
          <svg key={current.slug} viewBox="0 0 400 70" className="mt-2 h-14 w-full overflow-visible" aria-hidden>
            <path d="M8 60 Q200 -30 392 60" fill="none" stroke="rgb(255 255 255 / 0.15)" strokeWidth="1.5" strokeDasharray="4 6" />
            <path data-route d="M8 60 Q200 -30 392 60" fill="none" stroke="url(#route-gradient)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="420" />
            <defs>
              <linearGradient id="route-gradient" x1="0" x2="1">
                <stop offset="0" stopColor="#10b981" />
                <stop offset="1" stopColor="#60a5fa" />
              </linearGradient>
            </defs>
            <circle cx="8" cy="60" r="5" fill="#10b981" stroke="white" strokeWidth="2" />
            <circle cx="392" cy="60" r="5" fill="#3b82f6" stroke="white" strokeWidth="2" />
            {!reduced && (
              <g>
                <circle r="4" fill="white" />
                <circle r="9" fill="white" opacity="0.2" />
                <animateMotion dur="1.6s" fill="freeze" path="M8 60 Q200 -30 392 60" keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.45 0 0.55 1" />
              </g>
            )}
          </svg>
        </div>

        <dl data-reveal className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-white/[0.06] p-4 ring-1 ring-white/10">
            <dt className="flex items-center gap-1.5 text-xs text-white/55">
              <Building2 aria-hidden className="size-3.5" /> Capital
            </dt>
            <dd className="mt-1 font-semibold">{current.capital}</dd>
          </div>
          <div className="rounded-2xl bg-white/[0.06] p-4 ring-1 ring-white/10">
            <dt className="flex items-center gap-1.5 text-xs text-white/55">
              <Coins aria-hidden className="size-3.5" /> Currency
            </dt>
            <dd className="mt-1 truncate font-semibold">{current.currency}</dd>
          </div>
        </dl>

        <ul data-reveal aria-label="Hiring sectors" className="mt-5 flex flex-wrap gap-2">
          {current.sectors.map((sector) => (
            <li key={sector} className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white/85 ring-1 ring-white/10">
              {sector}
            </li>
          ))}
        </ul>

        <div data-reveal className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink
            href={routes.findCandidatesFor({ country: current.slug })}
            size="lg"
            variant="secondary"
            className="h-13 bg-white text-navy ring-0 hover:bg-white"
          >
            <Search /> Workers open to {current.name.length > 14 ? current.isoCode : current.name} <ArrowUpRight />
          </ButtonLink>
          <ButtonLink href={routes.country(current.slug)} size="lg" variant="ghost" className="h-13 text-white ring-1 ring-white/20 hover:bg-white/10 hover:text-white">
            <Plane /> Country guide
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
