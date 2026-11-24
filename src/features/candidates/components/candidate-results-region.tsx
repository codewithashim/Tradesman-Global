"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/components/animations";
import { media } from "@/lib/animations/motion";
import { cn } from "@/lib/utils/cn";
import { useCandidateNavigation } from "../hooks/use-candidate-navigation";

/**
 * Wraps server-rendered results: cards marked `data-card` rise in whenever
 * the result set changes (`resultKey`), and a progress bar runs while a
 * filter change is in flight.
 */
export function CandidateResultsRegion({ children, resultKey }: { children: ReactNode; resultKey: string }) {
  const { isPending } = useCandidateNavigation();
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(media.motion, () => {
        gsap.fromTo(
          "[data-card]",
          { y: 36, autoAlpha: 0, scale: 0.97 },
          { y: 0, autoAlpha: 1, scale: 1, duration: 0.8, stagger: 0.06, ease: "expo.out", clearProps: "transform" },
        );
      });
    },
    { scope: ref, dependencies: [resultKey] },
  );

  return (
    <div ref={ref} aria-busy={isPending} className="relative">
      <div aria-hidden className={cn("absolute inset-x-0 -top-4 h-0.5 overflow-hidden rounded-full transition-opacity", isPending ? "opacity-100" : "opacity-0")}>
        <div className="h-full w-1/3 animate-[indeterminate_1.1s_ease-in-out_infinite] rounded-full bg-linear-to-r from-transparent via-primary to-transparent" />
      </div>
      <div className={cn("transition-[opacity,filter] duration-300", isPending && "pointer-events-none opacity-55 blur-[1.5px]")}>{children}</div>
    </div>
  );
}
