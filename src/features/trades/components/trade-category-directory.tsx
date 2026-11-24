import type { TradeCategoryWithTrades } from "../types/trade";
import { TradeGrid } from "./trade-grid";

/** All categories with their trades, plus a sticky, swipeable category bar. */
export function TradeCategoryDirectory({ categories }: { categories: TradeCategoryWithTrades[] }) {
  return (
    <div className="flex flex-col gap-12 sm:gap-16">
      <nav
        aria-label="Trade categories"
        className="sticky top-16 z-30 -mx-4 bg-background/85 px-4 py-3 backdrop-blur-xl sm:-mx-6 sm:px-6 lg:top-[72px] lg:-mx-8 lg:px-8"
      >
        <ul className="flex gap-2 overflow-x-auto [scrollbar-width:none]">
          {categories.map((category) => (
            <li key={category.id} className="shrink-0">
              <a
                href={`#${category.id}`}
                className="inline-flex h-10 items-center gap-2 rounded-full bg-card px-4 text-sm font-semibold text-navy shadow-soft ring-1 ring-border/70 transition hover:bg-sky active:scale-95"
              >
                {category.name}
                <span className="grid min-w-5 place-items-center rounded-full bg-sky px-1.5 text-[11px] font-bold text-primary">
                  {category.trades.length}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {categories.map((category, index) => (
        <section key={category.id} id={category.id} aria-labelledby={`${category.id}-title`} className="scroll-mt-36">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
                Category {String(index + 1).padStart(2, "0")}
              </p>
              <h2 id={`${category.id}-title`} className="mt-1 text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
                {category.name}
              </h2>
              <p className="mt-1.5 max-w-xl text-sm text-muted-foreground sm:text-base">{category.description}</p>
            </div>
          </div>
          <TradeGrid trades={category.trades} />
        </section>
      ))}
    </div>
  );
}
