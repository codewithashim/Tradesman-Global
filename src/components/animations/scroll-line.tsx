"use client";

import { useRef } from "react";
import { media } from "@/lib/animations/motion";
import { cn } from "@/lib/utils/cn";
import { gsap, useGSAP } from "./gsap";

/**
 * A vertical line that draws itself down its parent as the parent scrolls
 * through the viewport (timelines, step lists). Place inside a relative parent.
 */
export function ScrollLine({ className }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(media.motion, () => {
        gsap.fromTo(
          ref.current,
          { scaleY: 0 },
          { scaleY: 1, ease: "none", scrollTrigger: { trigger: ref.current?.parentElement, start: "top 70%", end: "bottom 60%", scrub: true } },
        );
      });
    },
    { scope: ref },
  );

  return <span ref={ref} aria-hidden className={cn("absolute w-0.5 origin-top rounded-full bg-primary", className)} />;
}
