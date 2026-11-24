"use client";

import { useRef, type ReactNode } from "react";
import { gsap, SplitText, useGSAP } from "@/components/animations";
import { media } from "@/lib/animations/motion";

/**
 * The homepage's one orchestrated moment: headline lines rise, the globe
 * settles in and the search rises.
 * Content is server-rendered; this only choreographs it.
 */
export function HeroStage({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const all = q("[data-anim='hide']");
      const mm = gsap.matchMedia();

      mm.add(media.motion, () => {
        const split = SplitText.create(q("[data-hero='title']"), { type: "lines", mask: "lines", linesClass: "pb-[0.06em]" });
        gsap.set(all, { autoAlpha: 1 });

        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.from(q("[data-hero='kicker']"), { y: 16, autoAlpha: 0, duration: 0.8 })
          .from(split.lines, { yPercent: 115, duration: 1.4, stagger: 0.12 }, 0.1)
          .from(q("[data-hero='fade']"), { y: 24, autoAlpha: 0, duration: 1, stagger: 0.08 }, 0.55)
          .from(q("[data-hero='globe']"), { scale: 0.9, autoAlpha: 0, duration: 2 }, 0.2)
          .from(q("[data-hero='search']"), { y: 40, autoAlpha: 0, duration: 1.1 }, 0.9);

        // Leaving the hero: the stage sinks back slightly (desktop only, see below).
        return () => split.revert();
      });

      mm.add(media.desktop, () => {
        gsap.to(q("[data-hero='globe']"), {
          yPercent: 12,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
        });
      });

      mm.add(media.reduced, () => {
        gsap.set(all, { autoAlpha: 1 });
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
