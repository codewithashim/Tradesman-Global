/**
 * Motion vocabulary shared by every animation. One set of eases and durations
 * keeps the site feeling like a single choreographed piece.
 */
export const ease = {
  /** Default for reveals: fast start, long soft landing. */
  out: "expo.out",
  inOut: "power3.inOut",
  /** Scroll-scrubbed motion follows the finger exactly. */
  scrub: "none",
} as const;

export const duration = {
  quick: 0.35,
  base: 0.9,
  slow: 1.4,
} as const;

/** Media queries used with gsap.matchMedia(). */
export const media = {
  motion: "(prefers-reduced-motion: no-preference)",
  reduced: "(prefers-reduced-motion: reduce)",
  desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
  finePointer: "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
} as const;
