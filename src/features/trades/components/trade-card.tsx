import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { tradeImage } from "@/config/trade-imagery";
import { routes } from "@/lib/constants/routes";
import type { Trade } from "../types/trade";
import { TradeDemandBadge } from "./trade-demand-badge";
import { TradeIcon } from "./trade-icon";

export function TradeCard({ trade }: { trade: Trade }) {
  const image = tradeImage(trade.slug);
  return (
    <Link
      href={routes.trade(trade.slug)}
      className="group flex h-full flex-col overflow-hidden rounded-3xl bg-card shadow-soft ring-1 ring-border/70 transition duration-300 hover:-translate-y-1 hover:shadow-float focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50 active:scale-[0.98]"
    >
      <div className="relative h-24 shrink-0 overflow-hidden sm:h-32">
        <Image
          src={image.src}
          alt=""
          fill
          sizes="(min-width: 1024px) 18rem, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-deep/50 to-transparent" />
        <TradeIcon icon={trade.icon} className="absolute -bottom-5 left-4 bg-card ring-4 ring-card sm:left-5" />
        <span className="absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-white/90 text-navy transition group-hover:rotate-45">
          <ArrowUpRight aria-hidden className="size-4" />
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 px-4 pb-4 pt-8 sm:px-5 sm:pb-5">
        <h3 className="text-[15px] font-bold leading-tight text-navy sm:text-base">{trade.name}</h3>
        <p className="hidden flex-1 text-sm leading-6 text-muted-foreground sm:block">{trade.summary}</p>
        <div className="mt-auto pt-1">
          <TradeDemandBadge demand={trade.demand} />
        </div>
      </div>
    </Link>
  );
}
