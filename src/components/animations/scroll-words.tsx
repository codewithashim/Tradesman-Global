"use client";

import { useRef, type ElementType } from "react";
import { media } from "@/lib/animations/motion";
import { gsap, SplitText, useGSAP } from "./gsap";

/**
 * A statement that "writes itself" as you scroll: each word brightens from
 * faint to full as it passes through the viewport. Static and fully legible
 * with reduced motion.
 */
export function ScrollWords({ as: Tag = "p", text, className }: { as?: ElementType; text: string; className?: string }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(media.motion, () => {
        const split = SplitText.create(el, { type: "words" });
        gsap.fromTo(
          split.words,
          { opacity: 0.16 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.1,
            scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true },
          },
        );
        return () => split.revert();
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {text}
    </Tag>
  );
}
