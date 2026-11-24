import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { tradeImage } from "@/config/trade-imagery";
import { routes } from "@/lib/constants/routes";
import { cn } from "@/lib/utils/cn";
import type { Trade, TradeDemandLevel } from "../types/trade";
import { TradeIcon } from "./trade-icon";

const demand: Record<TradeDemandLevel, { label: string; dot: string }> = {
  high: { label: "High demand", dot: "bg-emerald" },
  growing: { label: "Growing demand", dot: "bg-brand-blue" },
  steady: { label: "Steady demand", dot: "bg-white/60" },
};

/**
 * Image-led trade tile. The photo slowly pushes in on hover and the summary
 * rises into view (desktop); phones get the compact face.
 */
export function TradeCard({ trade, profileCount }: { trade: Trade; profileCount?: number }) {
  const image = tradeImage(trade.slug);
  const level = demand[trade.demand];

  return (
    <Link
      href={routes.trade(trade.slug)}
      className="group relative isolate flex aspect-[4/5] h-full flex-col justify-between overflow-hidden rounded-[1.5rem] bg-navy p-4 text-white shadow-soft transition duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-20px_rgb(7_29_53/0.55)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50 active:scale-[0.98] sm:rounded-[1.75rem] sm:p-5"
    >
      <Image
        src={image.src}
        alt=""
        fill
        sizes="(min-width: 1024px) 18rem, (min-width: 640px) 33vw, 50vw"
        className="-z-20 object-cover transition duration-[1.4s] ease-out group-hover:scale-110"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-t from-navy-deep via-navy-deep/45 to-navy-deep/10 transition-opacity duration-500" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-t from-primary/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="flex items-start justify-between gap-2">
        <TradeIcon
          icon={trade.icon}
          className="rounded-xl bg-white/15 text-white ring-white/25 backdrop-blur-md transition duration-500 group-hover:-rotate-6 group-hover:bg-white group-hover:text-primary"
        />
        <span className="grid size-9 place-items-center rounded-full bg-white/90 text-navy transition duration-500 group-hover:rotate-45 group-hover:bg-white">
          <ArrowUpRight aria-hidden className="size-4" />
        </span>
      </div>

      <div>
        <p className="flex items-center gap-1.5 text-[11px] font-medium text-white/75 sm:text-xs">
          <span aria-hidden className={cn("size-1.5 rounded-full", level.dot)} />
          {level.label}
        </p>
        <h3 className="type-display mt-1.5 text-xl leading-[1.02] sm:text-2xl">{trade.name}</h3>
        <span className="hidden grid-rows-[0fr] transition-[grid-template-rows] duration-500 group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr] lg:grid">
          <span className="overflow-hidden">
            <span className="block pt-2 text-sm leading-6 text-white/80">{trade.summary}</span>
          </span>
        </span>
        {profileCount !== undefined && (
          <span className="mt-3 inline-flex rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold ring-1 ring-white/20 backdrop-blur">
            {profileCount} {profileCount === 1 ? "profile" : "profiles"}
          </span>
        )}
      </div>
    </Link>
  );
}
