import type { PopularTrade } from "../data/homepage-content";
import type { GlobePoint } from "../components/route-globe";

/**
 * View models for homepage sections. The homepage composes data from other
 * features; its service maps their records into these shapes so this feature
 * stays independent of their internals.
 */

export interface HomepageStats {
  profiles: number;
  trades: number;
  destinations: number;
  districts: number;
}

export interface PopularTradeCardData extends PopularTrade {
  profileCount: number;
}

export interface DestinationRow {
  slug: string;
  name: string;
  isoCode: string;
  region: string;
  capital: string;
  currency: string;
  summary: string;
  sectors: string[];
  /** Straight-line distance from Dhaka to the capital, in km. */
  distanceKm: number;
}

export interface GlobeData {
  origin: GlobePoint;
  destinations: GlobePoint[];
}
