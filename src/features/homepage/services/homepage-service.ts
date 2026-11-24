import {
  experienceOptions,
  getCandidateCountsByTrade,
  getDirectoryStats,
  getFeaturedCandidates,
  type Candidate,
} from "@/features/candidates";
import { getCountries } from "@/features/countries";
import { getTrades } from "@/features/trades";
import type { Option } from "@/types/common";
import { popularTradeGroups, popularTrades } from "../data/homepage-content";
import type { PopularTradeCardData } from "../sections/popular-trades-section";
import type { DestinationSummary, HomepageStats } from "../types/homepage";

/*
 * The homepage is a composition feature: it reads other features through their
 * public APIs and maps them into its own view models. Nothing imports homepage.
 */

export interface HomepageData {
  stats: HomepageStats;
  tradeOptions: Option[];
  countryOptions: Option[];
  experienceOptions: Option[];
  popularTrades: PopularTradeCardData[];
  featuredWorkers: Candidate[];
  destinations: DestinationSummary[];
}

export async function getHomepageData(): Promise<HomepageData> {
  const [trades, countries, counts, featured, directory] = await Promise.all([
    getTrades(),
    getCountries(),
    getCandidateCountsByTrade(),
    getFeaturedCandidates(5),
    getDirectoryStats(),
  ]);

  return {
    stats: {
      profiles: directory.profiles,
      trades: trades.length,
      destinations: countries.length,
      districts: directory.districts,
    },
    tradeOptions: trades.map((t) => ({ value: t.slug, label: t.name })),
    countryOptions: countries.map((c) => ({ value: c.slug, label: c.name })),
    experienceOptions,
    popularTrades: popularTrades.map((card) => ({
      ...card,
      profileCount: (popularTradeGroups[card.tradeSlug] ?? [card.tradeSlug]).reduce(
        (sum, slug) => sum + (counts[slug] ?? 0),
        0,
      ),
    })),
    featuredWorkers: featured,
    destinations: countries.map((c) => ({
      slug: c.slug,
      name: c.name,
      isoCode: c.isoCode,
      region: c.region,
      summary: c.summary,
      tradeCount: c.inDemandTradeSlugs.length,
    })),
  };
}
