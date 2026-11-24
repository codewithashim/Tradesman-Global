// Public API of the trades feature. Import from "@/features/trades" only.

export type {
  Trade,
  TradeCategory,
  TradeCategoryId,
  TradeCategoryWithTrades,
  TradeDemandLevel,
  TradeIconKey,
} from "./types/trade";

export {
  getTrades,
  getTradeBySlug,
  getTradesBySlugs,
  getTradeCategories,
  getTradeCategoriesWithTrades,
  getRelatedTrades,
  getTradeSlugs,
} from "./services/trade-service";

export { TradeCard } from "./components/trade-card";
export { TradeGrid } from "./components/trade-grid";
export { TradeIcon } from "./components/trade-icon";
export { TradeCategoryDirectory } from "./components/trade-category-directory";
export { TradeDetail, TradeHero } from "./components/trade-detail";
export { TradesHero } from "./components/trades-hero";
