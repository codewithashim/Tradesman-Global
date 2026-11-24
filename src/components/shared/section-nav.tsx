"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export interface SectionNavItem {
  id: string;
  label: string;
  /** Optional trailing badge (e.g. a count). */
  badge?: ReactNode;
}

/**
 * In-page navigation that follows the reader: the pill under the current
 * section glides as you scroll, and the rail keeps it in view on phones.
 * The parent decides where it sticks.
 */
export function SectionNav({ items, label, className }: { items: SectionNavItem[]; label: string; className?: string }) {
  const [active, setActive] = useState(items[0]?.id ?? "");
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);
  const railRef = useRef<HTMLUListElement>(null);

  // Scroll-spy: the section crossing the upper-middle of the viewport is current.
  useEffect(() => {
    const sections = items.map((item) => document.getElementById(item.id)).filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [items]);

  useLayoutEffect(() => {
    const rail = railRef.current;
    const index = items.findIndex((i) => i.id === active);
    const el = rail?.children[index] as HTMLElement | undefined;
    if (!rail || !el) return;
    setPill({ left: el.offsetLeft, width: el.offsetWidth });
    if (rail.scrollWidth > rail.clientWidth) {
      rail.scrollTo({ left: el.offsetLeft - rail.clientWidth / 2 + el.clientWidth / 2, behavior: "smooth" });
    }
  }, [active, items]);

  return (
    <nav aria-label={label} className={className}>
      <ul ref={railRef} className="relative flex gap-1 overflow-x-auto rounded-full bg-card/90 p-1.5 shadow-soft ring-1 ring-border/70 backdrop-blur-xl [scrollbar-width:none]">
        {items.map((item) => {
          const isActive = item.id === active;
          return (
            <li key={item.id} className="relative z-10 shrink-0">
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "inline-flex h-9 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/30",
                  isActive ? "text-white" : "text-navy/65 hover:text-navy",
                )}
              >
                {item.label}
                {item.badge !== undefined && (
                  <span
                    className={cn(
                      "grid h-5 min-w-5 place-items-center rounded-full px-1.5 text-[11px] font-bold tabular-nums transition-colors duration-300",
                      isActive ? "bg-white/20 text-white" : "bg-sky text-primary",
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </a>
            </li>
          );
        })}
        <span
          aria-hidden
          style={pill ? { transform: `translateX(${pill.left - 6}px)`, width: pill.width } : undefined}
          className={cn(
            "absolute left-1.5 top-1.5 h-9 rounded-full bg-navy shadow-[0_8px_16px_-8px_rgb(7_29_53/0.7)] transition-[transform,width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            !pill && "opacity-0",
          )}
        />
      </ul>
    </nav>
  );
}
