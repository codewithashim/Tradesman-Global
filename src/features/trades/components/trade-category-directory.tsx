import { SectionNav } from "@/components/shared/section-nav";
import { cn } from "@/lib/utils/cn";
import type { TradeCategoryWithTrades } from "../types/trade";
import { TradeCard } from "./trade-card";

/**
 * Every category with its trades. A sticky pill nav follows your scroll;
 * on desktop each category's title holds beside its trades as they pass.
 */
export function TradeCategoryDirectory({ categories, counts }: { categories: TradeCategoryWithTrades[]; counts?: Record<string, number> }) {
  return (
    <div className="flex flex-col gap-14 sm:gap-20">
      <SectionNav
        label="Trade categories"
        items={categories.map((c) => ({ id: c.id, label: c.name, badge: c.trades.length }))}
        className="sticky top-[4.5rem] z-30 w-fit max-w-full lg:top-[5.25rem]"
      />

      {categories.map((category) => {
        const profiles = counts ? category.trades.reduce((sum, t) => sum + (counts[t.slug] ?? 0), 0) : null;
        return (
          <section
            key={category.id}
            id={category.id}
            aria-labelledby={`${category.id}-title`}
            className="grid scroll-mt-40 grid-cols-1 gap-6 lg:grid-cols-[18rem_1fr] lg:gap-12"
          >
            <div className="lg:sticky lg:top-44 lg:self-start">
              <h2 id={`${category.id}-title`} className="type-display text-3xl text-navy sm:text-4xl">
                {category.name}
              </h2>
              <p className="mt-3 max-w-md text-base leading-7 text-muted-foreground">{category.description}</p>
              <p className="mt-4 flex gap-4 text-sm text-navy">
                <span>
                  <strong className="font-semibold">{category.trades.length}</strong> {category.trades.length === 1 ? "trade" : "trades"}
                </span>
                {profiles !== null && (
                  <span>
                    <strong className="font-semibold">{profiles}</strong> {profiles === 1 ? "profile" : "profiles"}
                  </span>
                )}
              </p>
            </div>
            {/* Four trades sit in one even row on wide screens instead of leaving an orphan. */}
            <ul className={cn("grid grid-cols-2 gap-3 sm:gap-5", category.trades.length === 4 ? "sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4" : "sm:grid-cols-3")}>
              {category.trades.map((trade) => (
                <li key={trade.slug}>
                  <TradeCard trade={trade} profileCount={counts ? (counts[trade.slug] ?? 0) : undefined} />
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
