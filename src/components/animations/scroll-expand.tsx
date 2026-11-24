"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { gsap, useGSAP } from "./gsap";

/**
 * A frame that opens from an inset, rounded window to full width as it
 * scrolls into view. Tablet/desktop only; phones get the finished frame.
 */
export function ScrollExpand({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ref.current,
          { clipPath: "inset(0% 9% 0% 9% round 2.5rem)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 0rem)",
            ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top 85%", end: "top 15%", scrub: true },
          },
        );
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={cn("will-change-[clip-path]", className)}>
      {children}
    </div>
  );
}
