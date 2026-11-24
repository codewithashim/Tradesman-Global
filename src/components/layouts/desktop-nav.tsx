"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNav } from "@/lib/constants/site";
import { routes } from "@/lib/constants/routes";
import { cn } from "@/lib/utils/cn";

/** Which nav item a path belongs to (hash links like /#destinations never match a page). */
function activeIndex(pathname: string) {
  return mainNav.findIndex(({ href }) => {
    if (href.includes("#")) return false;
    if (href === routes.tradeCategories) return pathname === href || pathname.startsWith("/trade/");
    return pathname === href || pathname.startsWith(`${href}/`);
  });
}

/**
 * Desktop primary navigation: plain links with one highlight pill that glides
 * to whichever link you point at, and rests on the current page.
 */
export function DesktopNav() {
  const pathname = usePathname();
  const current = activeIndex(pathname);
  const [hovered, setHovered] = useState<number | null>(null);
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const target = hovered ?? (current >= 0 ? current : null);

  useLayoutEffect(() => {
    const item = target === null ? null : (listRef.current?.children[target] as HTMLElement | undefined);
    setPill(item ? { left: item.offsetLeft, width: item.offsetWidth } : null);
  }, [target]);

  return (
    <nav aria-label="Main" className="hidden lg:block">
      <ul ref={listRef} onMouseLeave={() => setHovered(null)} className="relative flex items-center gap-1">
        {mainNav.map((item, i) => {
          const isCurrent = i === current;
          return (
            <li key={item.href} className="relative z-10">
              <Link
                href={item.href}
                aria-current={isCurrent ? "page" : undefined}
                onMouseEnter={() => setHovered(i)}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered(null)}
                className={cn(
                  "inline-flex h-10 items-center rounded-full px-4 text-sm font-semibold transition-colors duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/30",
                  isCurrent || hovered === i ? "text-navy" : "text-navy/65",
                )}
              >
                {item.label}
                {isCurrent && <span aria-hidden className="ml-2 size-1.5 rounded-full bg-primary" />}
              </Link>
            </li>
          );
        })}
        <span
          aria-hidden
          style={pill ? { transform: `translateX(${pill.left}px)`, width: pill.width } : undefined}
          className={cn(
            "absolute left-0 top-0 h-10 rounded-full bg-sky ring-1 ring-primary/10 transition-[transform,width,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            pill ? "opacity-100" : "opacity-0",
          )}
        />
      </ul>
    </nav>
  );
}
