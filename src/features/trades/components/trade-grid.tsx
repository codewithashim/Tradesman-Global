import type { Trade } from "../types/trade";
import { TradeCard } from "./trade-card";

export function TradeGrid({ trades }: { trades: Trade[] }) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {trades.map((trade) => (
        <li key={trade.slug}>
          <TradeCard trade={trade} />
        </li>
      ))}
    </ul>
  );
}
