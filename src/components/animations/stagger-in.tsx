"use client";

import { useRef, type ReactNode } from "react";
import { media } from "@/lib/animations/motion";
import { gsap, useGSAP } from "./gsap";

/**
 * Children marked `data-stagger` flip up into place, one after another,
 * the first time the group enters the viewport.
 */
export function StaggerIn({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(media.motion, () => {
        gsap.from("[data-stagger]", {
          rotateX: -70,
          y: 24,
          autoAlpha: 0,
          transformOrigin: "50% 0%",
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.07,
          scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className} style={{ perspective: "900px" }}>
      {children}
    </div>
  );
}
