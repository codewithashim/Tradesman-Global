"use client";

import { useRef, type ReactNode } from "react";
import { media } from "@/lib/animations/motion";
import { cn } from "@/lib/utils/cn";
import { gsap, useGSAP } from "./gsap";

/**
 * Moves its child against the scroll for depth. `speed` is the travel in % of
 * the element's height (negative = moves up faster than the page).
 * Desktop only: on phones parallax costs battery and reads as jank.
 */
export function Parallax({ children, speed = -12, className }: { children: ReactNode; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(media.desktop, () => {
        gsap.fromTo(
          ref.current,
          { yPercent: -speed / 2 },
          {
            yPercent: speed / 2,
            ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
