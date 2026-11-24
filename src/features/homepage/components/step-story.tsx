"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/components/animations";
import { cn } from "@/lib/utils/cn";
import { PhoneFrame } from "./phone-screens";

export interface StoryStep {
  title: string;
  text: string;
  screen: ReactNode;
  /** Two small facts that float beside the phone while this step is active. */
  notes: { icon: ReactNode; label: string }[];
}

const RING = 2 * Math.PI * 17;

/** Animates a screen's parts in: rows rise, OTP digits pop, bars fill. */
function playScreen(screen: Element) {
  const tl = gsap.timeline();
  tl.fromTo(
    screen.querySelectorAll("[data-ui]"),
    { y: 14, autoAlpha: 0 },
    { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.05, ease: "expo.out" },
  );
  const digits = screen.querySelectorAll("[data-digit]");
  if (digits.length) tl.fromTo(digits, { scale: 0.4, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.4, stagger: 0.08, ease: "back.out(2.5)" }, 0.25);
  screen.querySelectorAll<HTMLElement>("[data-fill]").forEach((bar) => {
    tl.fromTo(bar, { width: "0%" }, { width: `${bar.dataset.fill}%`, duration: 1.6, ease: "power2.inOut" }, 0.3);
  });
  return tl;
}

/**
 * Desktop: the section pins while you scroll through four steps; the phone
 * changes screen at each one and the step's ring fills with progress.
 * Steps are also buttons, so keyboard and reduced-motion users can switch.
 * Phones: each step is its own card that animates as it scrolls in.
 */
export function StepStory({ intro, steps }: { intro: ReactNode; steps: StoryStep[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const pinRef = useRef<ScrollTrigger | null>(null);
  const [active, setActive] = useState(0);
  const prevActive = useRef(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const rings = gsap.utils.toArray<SVGCircleElement>("[data-ring]");
        pinRef.current = ScrollTrigger.create({
          trigger: "[data-pin]",
          start: "top top",
          end: `+=${steps.length * 75}%`,
          pin: true,
          scrub: true,
          onUpdate(self) {
            const exact = self.progress * steps.length;
            const index = Math.min(steps.length - 1, Math.floor(exact));
            setActive(index);
            rings.forEach((ring, i) => {
              const p = gsap.utils.clamp(0, 1, exact - i);
              ring.style.strokeDashoffset = String(RING * (1 - p));
            });
          },
        });
        // First screen plays when the story scrolls into view, not on page load.
        ScrollTrigger.create({
          trigger: "[data-pin]",
          start: "top 70%",
          once: true,
          onEnter: () => {
            const first = ref.current?.querySelector("[data-desktop-screen]");
            if (first) playScreen(first);
          },
        });
        return () => {
          pinRef.current = null;
        };
      });

      // Phone cards on small screens animate as each enters.
      mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.set("[data-screen] [data-ui], [data-screen] [data-digit]", { autoAlpha: 0 });
        gsap.utils.toArray<HTMLElement>("[data-mobile-step]").forEach((card) => {
          const screen = card.querySelector("[data-screen]");
          ScrollTrigger.create({
            trigger: card,
            start: "top 75%",
            once: true,
            onEnter: () => screen && playScreen(screen),
          });
        });
        gsap.fromTo(
          "[data-progress]",
          { scaleY: 0 },
          { scaleY: 1, ease: "none", scrollTrigger: { trigger: "[data-mobile-steps]", start: "top 60%", end: "bottom 60%", scrub: true } },
        );
      });
    },
    { scope: ref },
  );

  // Desktop screen swap whenever the active step changes (skipped on first render).
  const mounted = useRef(false);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    const screens = root.querySelectorAll<HTMLElement>("[data-desktop-screen]");
    const notes = root.querySelectorAll<HTMLElement>("[data-notes]");
    const from = prevActive.current;
    prevActive.current = active;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      screens.forEach((screen, i) => {
        if (i === active) {
          gsap.fromTo(
            screen,
            { autoAlpha: 0, yPercent: reduced ? 0 : active > from ? 6 : -6, scale: reduced ? 1 : 0.98 },
            { autoAlpha: 1, yPercent: 0, scale: 1, duration: reduced ? 0.2 : 0.7, ease: "expo.out" },
          );
          if (!reduced) playScreen(screen);
        } else {
          gsap.to(screen, { autoAlpha: 0, duration: 0.25, ease: "power2.out" });
        }
      });
      notes.forEach((group, i) => {
        const items = group.querySelectorAll("[data-note]");
        if (i === active) {
          gsap.fromTo(items, { autoAlpha: 0, scale: 0.8, y: 12 }, { autoAlpha: 1, scale: 1, y: 0, duration: 0.7, stagger: 0.12, delay: 0.2, ease: "back.out(1.7)" });
        } else {
          gsap.to(items, { autoAlpha: 0, duration: 0.2 });
        }
      });
    }, root);
    return () => ctx.revert();
  }, [active]);

  function goTo(index: number) {
    const st = pinRef.current;
    if (st) {
      const target = st.start + ((st.end - st.start) * (index + 0.5)) / steps.length;
      window.scrollTo({ top: target, behavior: "smooth" });
    } else {
      setActive(index);
    }
  }

  return (
    <div ref={ref}>
      {/* Desktop */}
      <div data-pin className="hidden min-h-screen items-center lg:flex">
        <div className="grid w-full grid-cols-12 items-center gap-12 py-16">
          <div className="col-span-6 xl:col-span-5">
            {intro}
            <ol className="mt-10 flex flex-col gap-2">
              {steps.map((step, i) => {
                const isActive = i === active;
                return (
                  <li key={step.title}>
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      aria-current={isActive ? "step" : undefined}
                      className={cn(
                        "group flex w-full items-start gap-4 rounded-3xl p-4 text-left transition-all duration-500",
                        isActive ? "bg-card shadow-float ring-1 ring-border/70" : "hover:bg-card/60",
                      )}
                    >
                      <span className="relative grid size-10 shrink-0 place-items-center">
                        <svg viewBox="0 0 40 40" className="absolute inset-0 -rotate-90" aria-hidden>
                          <circle cx="20" cy="20" r="17" fill="none" strokeWidth="2.5" className="stroke-border" />
                          <circle
                            data-ring
                            cx="20"
                            cy="20"
                            r="17"
                            fill="none"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeDasharray={RING}
                            strokeDashoffset={i <= active ? 0 : RING}
                            className="stroke-primary"
                          />
                        </svg>
                        <span className={cn("text-sm font-bold transition-colors", isActive ? "text-primary" : "text-navy/40")}>{i + 1}</span>
                      </span>
                      <span className="min-w-0 pt-1.5">
                        <span className={cn("block text-lg font-semibold transition-colors", isActive ? "text-navy" : "text-navy/40 group-hover:text-navy/70")}>
                          {step.title}
                        </span>
                        <span className={cn("grid transition-[grid-template-rows,opacity] duration-500", isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                          <span className="overflow-hidden">
                            <span className="block pt-1.5 text-sm leading-6 text-muted-foreground">{step.text}</span>
                          </span>
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          <div aria-hidden className="relative col-span-6 flex justify-center xl:col-span-7">
            {/* Ambient light behind the phone */}
            <div className="absolute left-1/2 top-1/2 size-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[100px]" />
            <div className="absolute left-1/2 top-1/2 size-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/15" />
            <div className="absolute left-1/2 top-1/2 size-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-primary/10" />

            <PhoneFrame className="relative h-[37rem] w-[18.5rem]">
              {steps.map((step, i) => (
                <div key={step.title} data-desktop-screen className={cn("absolute inset-0 px-4 pb-5 pt-10", i !== 0 && "invisible")}>
                  {step.screen}
                </div>
              ))}
            </PhoneFrame>

            {steps.map((step, i) => (
              <div key={step.title} data-notes className="pointer-events-none absolute inset-0">
                {step.notes.map(({ icon, label }, n) => (
                  <span
                    key={label}
                    data-note
                    className={cn(
                      "absolute flex items-center gap-2.5 rounded-2xl bg-card/95 py-2.5 pl-2.5 pr-4 text-sm font-semibold text-navy shadow-float ring-1 ring-border/70 backdrop-blur",
                      n === 0 ? "left-0 top-[22%] xl:left-[6%]" : "bottom-[20%] right-0 xl:right-[6%]",
                      i !== 0 && "invisible",
                    )}
                  >
                    <span className={cn("grid size-8 place-items-center rounded-xl [&_svg]:size-4", n === 0 ? "bg-sky text-primary" : "bg-emerald/15 text-emerald")}>
                      {icon}
                    </span>
                    {label}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Phones and tablets */}
      <div className="lg:hidden">
        {intro}
        <ol data-mobile-steps className="relative mt-10 flex flex-col gap-10 pl-9">
          <span aria-hidden className="absolute bottom-0 left-[13px] top-0 w-0.5 rounded-full bg-border" />
          <span aria-hidden data-progress className="absolute bottom-0 left-[13px] top-0 w-0.5 origin-top rounded-full bg-primary" />
          {steps.map((step, i) => (
            <li key={step.title} data-mobile-step className="relative">
              <span className="absolute -left-9 top-0 grid size-7 place-items-center rounded-full bg-primary text-xs font-bold text-white ring-4 ring-background">
                {i + 1}
              </span>
              <h3 className="type-display text-[1.75rem] text-navy">{step.title}</h3>
              <p className="mt-2 text-base leading-7 text-muted-foreground">{step.text}</p>
              <div aria-hidden className="relative mt-5 overflow-hidden rounded-[2rem] bg-linear-to-br from-sky to-card p-5 ring-1 ring-border/70">
                <div className="absolute -right-10 -top-10 size-40 rounded-full bg-primary/15 blur-2xl" />
                <div data-screen className="relative mx-auto h-[25rem] max-w-[16rem] rounded-[1.75rem] bg-card p-4 shadow-float ring-1 ring-border/60">
                  {step.screen}
                </div>
                <div className="relative mt-4 flex flex-wrap justify-center gap-2">
                  {step.notes.map(({ icon, label }) => (
                    <span key={label} className="inline-flex items-center gap-1.5 rounded-full bg-card px-3 py-1.5 text-xs font-semibold text-navy shadow-soft ring-1 ring-border/70 [&_svg]:size-3.5 [&_svg]:text-primary">
                      {icon}
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
