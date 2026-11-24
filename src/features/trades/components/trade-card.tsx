import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { routes } from "@/lib/constants/routes";
import type { Trade } from "../types/trade";
import { TradeIcon } from "./trade-icon";
import { TradeDemandBadge } from "./trade-demand-badge";

export function TradeCard({ trade }: { trade: Trade }) {
  return (
    <Link
      href={routes.trade(trade.slug)}
      className="group flex h-full flex-col gap-4 rounded-xl border border-border bg-card p-5 transition hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      <div className="flex items-start justify-between gap-3">
        <TradeIcon icon={trade.icon} />
        <ArrowUpRight
          aria-hidden
          className="size-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
        />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold">{trade.name}</h3>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">{trade.summary}</p>
      </div>
      <TradeDemandBadge demand={trade.demand} />
    </Link>
  );
}
