import type { Trade } from "../types/trade";
import { TradeCard } from "./trade-card";

/** Two compact columns on phones, up to four on desktop. `counts` (by slug) is optional. */
export function TradeGrid({ trades, counts }: { trades: Trade[]; counts?: Record<string, number> }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
      {trades.map((trade) => (
        <li key={trade.slug}>
          <TradeCard trade={trade} profileCount={counts ? (counts[trade.slug] ?? 0) : undefined} />
        </li>
      ))}
    </ul>
  );
}
