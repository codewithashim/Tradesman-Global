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
import type { DestinationRow, GlobeData, HomepageStats, PopularTradeCardData } from "../types/homepage";

/** Where every route on the hero globe starts. */
const ORIGIN = { label: "Dhaka", code: "BD", lat: 23.81, lng: 90.41 };

/** Great-circle distance in km (haversine). */
function distanceFromOrigin(lat: number, lng: number): number {
  const rad = Math.PI / 180;
  const dLat = (lat - ORIGIN.lat) * rad;
  const dLng = (lng - ORIGIN.lng) * rad;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(ORIGIN.lat * rad) * Math.cos(lat * rad) * Math.sin(dLng / 2) ** 2;
  return Math.round((6371 * 2 * Math.asin(Math.sqrt(a))) / 10) * 10;
}

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
  destinations: DestinationRow[];
  globe: GlobeData;
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
      capital: c.capital,
      currency: c.currency,
      summary: c.summary,
      sectors: c.keySectors.slice(0, 3),
      distanceKm: distanceFromOrigin(c.coordinates.lat, c.coordinates.lng),
    })),
    globe: {
      origin: ORIGIN,
      destinations: countries.map((c) => ({ label: c.name === "United Arab Emirates" ? "UAE" : c.name, code: c.isoCode, ...c.coordinates })),
    },
  };
}
