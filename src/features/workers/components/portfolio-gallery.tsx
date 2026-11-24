"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { PortfolioItem } from "../types/worker";
import { PortfolioImage } from "./portfolio-image";

/** Grid of portfolio items with an accessible lightbox (native <dialog>: focus trap + Esc for free). */
export function PortfolioGallery({ items }: { items: PortfolioItem[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = activeIndex === null ? null : items[activeIndex];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (activeIndex !== null && !dialog.open) dialog.showModal();
    if (activeIndex === null && dialog.open) dialog.close();
  }, [activeIndex]);

  const step = (delta: number) =>
    setActiveIndex((index) => (index === null ? null : (index + delta + items.length) % items.length));

  return (
    <>
      {/*
        Bento on sm+: first item featured (2×2) when the rest fill the grid
        cleanly; exactly four items use an even 2×2 grid instead.
      */}
      <ul
        className={cn(
          "grid grid-cols-2 gap-3",
          items.length === 4 ? "sm:auto-rows-[13rem]" : "sm:auto-rows-[12rem] sm:grid-cols-3",
        )}
      >
        {items.map((item, index) => {
          const featured = index === 0 && items.length >= 3 && items.length !== 4;
          const meta = [item.location, item.year].filter(Boolean).join(" · ");
          return (
            <li key={item.id} className={cn(featured && "col-span-2 sm:row-span-2")}>
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl bg-navy text-left shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-float focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50 active:scale-[0.98]"
              >
                <span className="relative block min-h-0 flex-1 overflow-hidden">
                  <PortfolioImage
                    item={item}
                    compact
                    className="aspect-4/3 size-full transition duration-700 group-hover:scale-105 sm:aspect-auto"
                  />
                </span>
                {item.imageUrl ? (
                  // Over real photos: caption on a dark gradient.
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-deep/85 to-transparent px-4 pb-3 pt-8">
                    <span className={cn("block truncate font-semibold text-white", featured ? "text-base" : "text-sm")}>
                      {item.title}
                    </span>
                    {meta && <span className="block truncate text-xs text-white/70">{meta}</span>}
                  </span>
                ) : (
                  // Over placeholders: caption on the dark tile.
                  <span className="absolute inset-x-0 bottom-0 px-4 pb-3.5">
                    <span className={cn("block truncate font-semibold text-white", featured ? "text-lg" : "text-sm")}>{item.title}</span>
                    <span className="block truncate text-xs text-white/55">{meta ? `${meta} · photo coming soon` : "Photo coming soon"}</span>
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label={active ? active.title : "Portfolio item"}
        onClose={() => setActiveIndex(null)}
        onClick={(event) => event.target === event.currentTarget && setActiveIndex(null)}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") step(1);
          if (event.key === "ArrowLeft") step(-1);
        }}
        className="m-auto w-[min(56rem,calc(100vw-2rem))] overflow-hidden rounded-[2rem] border-0 bg-card p-0 text-foreground shadow-float backdrop:bg-navy-deep/80 backdrop:backdrop-blur-sm open:animate-in open:fade-in open:zoom-in-95"
      >
        {active && activeIndex !== null && (
          <div className="flex flex-col">
            <div className="relative">
              <PortfolioImage item={active} className="aspect-video w-full" />
              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                aria-label="Close"
                className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-card/90 hover:bg-card"
              >
                <X aria-hidden className="size-4" />
              </button>
            </div>
            <div className="flex items-start justify-between gap-4 p-5">
              <div>
                <h3 className="font-semibold">{active.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{active.description}</p>
                {(active.location || active.year) && (
                  <p className="mt-2 text-xs text-muted-foreground">{[active.location, active.year].filter(Boolean).join(" · ")}</p>
                )}
              </div>
              {items.length > 1 && (
                <div className="flex shrink-0 items-center gap-1">
                  <button type="button" onClick={() => step(-1)} aria-label="Previous item" className="grid size-9 place-items-center rounded-lg border border-border hover:bg-muted">
                    <ChevronLeft aria-hidden className="size-4" />
                  </button>
                  <span className="w-12 text-center text-xs text-muted-foreground">
                    {activeIndex + 1} / {items.length}
                  </span>
                  <button type="button" onClick={() => step(1)} aria-label="Next item" className="grid size-9 place-items-center rounded-lg border border-border hover:bg-muted">
                    <ChevronRight aria-hidden className="size-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
