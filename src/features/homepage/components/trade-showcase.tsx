"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { siteImages } from "@/config/images";
import { routes } from "@/lib/constants/routes";
import { cn } from "@/lib/utils/cn";
import type { PopularTradeCardData } from "../types/homepage";

function countLabel(n: number) {
  return `${n} ${n === 1 ? "profile" : "profiles"}`;
}

/**
 * Desktop: the trade names are the interface — hover or focus one and its
 * photograph is unmasked in the frame beside it.
 * Phones: a swipeable rail of tall photo cards.
 */
export function TradeShowcase({ trades }: { trades: PopularTradeCardData[] }) {
  const [active, setActive] = useState(0);
  const current = trades[active];

  return (
    <>
      {/* Phones and tablets */}
      <ul className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:hidden">
        {trades.map((trade) => {
          const image = siteImages[trade.image];
          return (
            <li key={trade.tradeSlug} className="w-[68%] shrink-0 snap-start sm:w-[40%]">
              <Link
                href={routes.trade(trade.tradeSlug)}
                className="group relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-[1.75rem] p-5 text-white active:scale-[0.98] transition"
              >
                <Image src={image.src} alt="" fill sizes="(min-width: 640px) 40vw, 68vw" className="object-cover" />
                <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/30 to-transparent" />
                <span className="relative text-xs font-medium text-white/70">{countLabel(trade.profileCount)}</span>
                <span className="type-display relative mt-1 text-[1.9rem]">{trade.title}</span>
                <span className="relative mt-2 line-clamp-2 text-sm text-white/70">{trade.description}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Desktop */}
      <div className="hidden grid-cols-12 gap-10 lg:grid">
        <ul className="col-span-7 border-b border-border">
          {trades.map((trade, i) => {
            const isActive = i === active;
            return (
              <li key={trade.tradeSlug} className="border-t border-border">
                <Link
                  href={routes.trade(trade.tradeSlug)}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group flex items-center justify-between gap-6 py-5 outline-none"
                >
                  <span
                    className={cn(
                      "type-display text-5xl transition-[color,transform] duration-500 ease-out xl:text-[3.6rem]",
                      isActive ? "translate-x-3 text-navy" : "text-navy/25 group-focus-visible:text-navy",
                    )}
                  >
                    {trade.title}
                  </span>
                  <span className="flex shrink-0 items-center gap-4">
                    <span className={cn("text-sm font-medium transition-colors", isActive ? "text-muted-foreground" : "text-transparent")}>
                      {countLabel(trade.profileCount)}
                    </span>
                    <span
                      className={cn(
                        "grid size-12 place-items-center rounded-full transition duration-500",
                        isActive ? "rotate-45 bg-primary text-white" : "bg-transparent text-navy/30 ring-1 ring-border",
                      )}
                    >
                      <ArrowUpRight aria-hidden className="size-5" />
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="col-span-5">
          <div className="sticky top-28">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.25rem] bg-navy">
              {trades.map((trade, i) => {
                const image = siteImages[trade.image];
                return (
                  <Image
                    key={trade.tradeSlug}
                    src={image.src}
                    alt=""
                    fill
                    sizes="40vw"
                    className={cn(
                      "object-cover transition-[clip-path,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      i === active ? "scale-100 [clip-path:inset(0_0_0_0)]" : "scale-110 [clip-path:inset(0_0_100%_0)]",
                    )}
                  />
                );
              })}
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-deep/85 via-transparent to-transparent" />
              <p key={current.tradeSlug} className="absolute inset-x-7 bottom-7 text-lg leading-snug text-white animate-in fade-in slide-in-from-bottom-2 duration-500">
                {current.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
