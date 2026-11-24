import type { ReactNode } from "react";
import { BadgeCheck, Wrench } from "lucide-react";
import type { Trade, TradeCategory } from "../types/trade";
import { TradeIcon } from "./trade-icon";
import { TradeDemandBadge } from "./trade-demand-badge";

interface TradeDetailProps {
  trade: Trade;
  category: TradeCategory | null;
}

/** Hero + skills/certifications for a single trade. */
export function TradeDetail({ trade, category }: TradeDetailProps) {
  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <TradeIcon icon={trade.icon} size="lg" />
        <div className="max-w-3xl">
          {category && (
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{category.name}</p>
          )}
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{trade.name}</h1>
          <p className="mt-4 text-base leading-7 text-muted-foreground text-pretty">{trade.description}</p>
          <div className="mt-5">
            <TradeDemandBadge demand={trade.demand} />
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <DetailList title="Key skills" icon={<Wrench aria-hidden className="size-4" />} items={trade.keySkills} />
        <DetailList
          title="Common certifications"
          icon={<BadgeCheck aria-hidden className="size-4" />}
          items={trade.commonCertifications}
        />
      </div>
    </div>
  );
}

function DetailList({ title, icon, items }: { title: string; icon: ReactNode; items: string[] }) {
  return (
    <section className="rounded-xl border border-border bg-card p-6">
      <h2 className="flex items-center gap-2 font-semibold">
        {icon}
        {title}
      </h2>
      <ul className="mt-4 flex flex-wrap gap-2">
        {items.map((item) => (
          <li key={item} className="rounded-md bg-muted px-3 py-1.5 text-sm">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
