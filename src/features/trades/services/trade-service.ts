import { tradeCategories } from "../data/trade-categories";
import { trades } from "../data/trades";
import type { Trade, TradeCategory, TradeCategoryWithTrades } from "../types/trade";

/*
 * Data access for the trades feature. UI must go through these functions —
 * never import ../data directly. In Phase 2, swap the bodies for API calls;
 * signatures stay the same.
 */

export async function getTrades(): Promise<Trade[]> {
  "use cache";
  return trades;
}

export async function getTradeBySlug(slug: string): Promise<Trade | null> {
  "use cache";
  return trades.find((trade) => trade.slug === slug) ?? null;
}

/** Returns trades in the order of `slugs`, skipping unknown slugs. */
export async function getTradesBySlugs(slugs: string[]): Promise<Trade[]> {
  "use cache";
  return slugs
    .map((slug) => trades.find((trade) => trade.slug === slug))
    .filter((trade): trade is Trade => trade !== undefined);
}

export async function getTradeCategories(): Promise<TradeCategory[]> {
  "use cache";
  return tradeCategories;
}

export async function getTradeCategoriesWithTrades(): Promise<TradeCategoryWithTrades[]> {
  "use cache";
  return tradeCategories.map((category) => ({
    ...category,
    trades: trades.filter((trade) => trade.categoryId === category.id),
  }));
}

/** Other trades in the same category, for "related trades" sections. */
export async function getRelatedTrades(trade: Trade, limit = 3): Promise<Trade[]> {
  "use cache";
  return trades
    .filter((other) => other.categoryId === trade.categoryId && other.slug !== trade.slug)
    .slice(0, limit);
}

export async function getTradeSlugs(): Promise<string[]> {
  "use cache";
  return trades.map((trade) => trade.slug);
}
