import Image from "next/image";
import type { ReactNode } from "react";
import { Award, Wrench } from "lucide-react";
import { SplitReveal } from "@/components/animations";
import { tradeImage } from "@/config/trade-imagery";
import type { Trade, TradeCategory } from "../types/trade";
import { TradeDemandBadge } from "./trade-demand-badge";
import { TradeIcon } from "./trade-icon";

interface TradeHeroProps {
  trade: Trade;
  category: TradeCategory | null;
  /** Rendered at the top of the hero (e.g. light breadcrumbs). */
  top?: ReactNode;
  /** Primary actions (rendered by the route, e.g. "Browse N workers"). */
  actions?: ReactNode;
}

/** Image-led hero for a trade page. */
export function TradeHero({ trade, category, top, actions }: TradeHeroProps) {
  const image = tradeImage(trade.slug);
  return (
    <section className="px-3 pt-3 sm:px-4">
      <div className="relative isolate overflow-hidden rounded-[2rem] bg-navy-deep text-white sm:rounded-[2.5rem]">
        <Image src={image.src} alt={image.alt} fill priority sizes="100vw" className="-z-20 animate-[ken-burns_24s_ease-in-out_infinite_alternate] object-cover opacity-60" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-deep via-navy-deep/75 to-navy-deep/30" />
        <div className="mx-auto flex min-h-[26rem] w-full max-w-7xl flex-col justify-end gap-5 px-5 pb-10 pt-6 sm:min-h-[30rem] sm:px-6 sm:pb-14 sm:pt-8 lg:px-8">
          {top && <div className="mb-auto pb-10">{top}</div>}
          <TradeIcon icon={trade.icon} size="lg" className="bg-white/15 text-white ring-white/25 backdrop-blur" />
          <div>
            {category && <p className="text-sm font-semibold text-brand-blue">{category.name}</p>}
            <SplitReveal as="h1" play="load" className="type-display mt-2 text-[2.9rem] text-balance sm:text-7xl lg:text-[5.5rem]">
              {trade.name}
            </SplitReveal>
            <p className="mt-3 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">{trade.summary}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <TradeDemandBadge demand={trade.demand} className="bg-white/15 px-3 py-1 text-white ring-white/25 backdrop-blur" />
          </div>
          {actions && <div className="flex flex-col gap-3 sm:flex-row">{actions}</div>}
        </div>
      </div>
    </section>
  );
}

/** About, key skills and certifications for a trade. */
export function TradeDetail({ trade }: { trade: Trade }) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.3fr_1fr] lg:gap-6">
      <section className="rounded-[2rem] bg-card p-6 shadow-soft ring-1 ring-border/70 sm:p-8 lg:row-span-2">
        <p className="text-sm font-semibold text-primary">About this trade</p>
        <h2 className="type-display mt-2 text-3xl text-navy sm:text-4xl">What a {trade.name.toLowerCase()} does</h2>
        <p className="mt-4 text-[17px] leading-8 text-navy/85 text-pretty">{trade.description}</p>
      </section>
      <DetailList title="Key skills" icon={<Wrench aria-hidden className="size-4" />} items={trade.keySkills} tone="brand" />
      <DetailList title="Common certifications" icon={<Award aria-hidden className="size-4" />} items={trade.commonCertifications} />
    </div>
  );
}

function DetailList({ title, icon, items, tone }: { title: string; icon: ReactNode; items: string[]; tone?: "brand" }) {
  return (
    <section className="rounded-[2rem] bg-card p-6 shadow-soft ring-1 ring-border/70 sm:p-7">
      <h2 className="flex items-center gap-2.5 text-base font-semibold text-navy">
        <span className="grid size-8 place-items-center rounded-xl bg-sky text-primary">{icon}</span>
        {title}
      </h2>
      <ul className="mt-4 flex flex-wrap gap-2">
        {items.map((item) => (
          <li
            key={item}
            className={
              tone === "brand"
                ? "rounded-full bg-sky px-3.5 py-1.5 text-sm font-semibold text-navy ring-1 ring-primary/15 transition hover:-translate-y-0.5 hover:bg-primary hover:text-white"
                : "rounded-full bg-muted px-3.5 py-1.5 text-sm font-medium text-navy"
            }
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
