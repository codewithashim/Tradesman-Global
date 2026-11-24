import type { TradeCategoryWithTrades } from "../types/trade";
import { TradeGrid } from "./trade-grid";

/** All categories with their trades, plus a jump-nav. Used by /trade-categories. */
export function TradeCategoryDirectory({ categories }: { categories: TradeCategoryWithTrades[] }) {
  return (
    <div className="flex flex-col gap-14">
      <nav aria-label="Trade categories" className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <ul className="flex gap-2 sm:flex-wrap">
          {categories.map((category) => (
            <li key={category.id} className="shrink-0">
              <a
                href={`#${category.id}`}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium hover:border-primary/60"
              >
                {category.name}
                <span className="text-xs text-muted-foreground">{category.trades.length}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {categories.map((category) => (
        <section key={category.id} id={category.id} aria-labelledby={`${category.id}-title`} className="scroll-mt-24">
          <div className="mb-5 border-l-2 border-primary pl-4">
            <h2 id={`${category.id}-title`} className="text-xl font-bold tracking-tight">
              {category.name}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">{category.description}</p>
          </div>
          <TradeGrid trades={category.trades} />
        </section>
      ))}
    </div>
  );
}
