"use client";

import { useRef, type ReactNode } from "react";
import { media } from "@/lib/animations/motion";
import { cn } from "@/lib/utils/cn";
import { gsap, useGSAP } from "./gsap";

/**
 * Pulls its child gently toward the cursor (mouse users only). Touch, keyboard
 * and reduced-motion users get the plain element.
 */
export function Magnetic({ children, strength = 0.3, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    (_, contextSafe) => {
      const el = ref.current;
      if (!el || !contextSafe) return;
      const mm = gsap.matchMedia();
      mm.add(media.finePointer, () => {
        const x = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
        const y = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
        const move = contextSafe((event: PointerEvent) => {
          const rect = el.getBoundingClientRect();
          x((event.clientX - rect.left - rect.width / 2) * strength);
          y((event.clientY - rect.top - rect.height / 2) * strength);
        });
        const leave = contextSafe(() => {
          x(0);
          y(0);
        });
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        return () => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        };
      });
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={cn("inline-flex", className)}>
      {children}
    </span>
  );
}
