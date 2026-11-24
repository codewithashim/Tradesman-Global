"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { duration, ease, media } from "@/lib/animations/motion";
import { gsap, SplitText, useGSAP } from "./gsap";

interface SplitRevealProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  /** "load" plays immediately (hero); "scroll" plays when the text enters the viewport. */
  play?: "load" | "scroll";
  delay?: number;
  id?: string;
}

/**
 * Headline that rises line by line out of a mask. Text stays real, selectable
 * and readable by screen readers (SplitText keeps aria-label on the parent).
 */
export function SplitReveal({ as: Tag = "h2", children, className, play = "scroll", delay = 0, id }: SplitRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(media.motion, () => {
        const split = SplitText.create(el, {
          type: "lines",
          mask: "lines",
          linesClass: "pb-[0.08em]",
          autoSplit: true,
          onSplit(self) {
            return gsap.from(self.lines, {
              yPercent: 110,
              duration: duration.slow,
              ease: ease.out,
              stagger: 0.09,
              delay,
              scrollTrigger: play === "scroll" ? { trigger: el, start: "top 85%", once: true } : undefined,
            });
          },
        });
        gsap.set(el, { visibility: "visible" });
        return () => split.revert();
      });
      mm.add(media.reduced, () => {
        gsap.set(el, { visibility: "visible" });
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} id={id} data-anim={play === "load" ? "hide" : undefined} className={className}>
      {children}
    </Tag>
  );
}
