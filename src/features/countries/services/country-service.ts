import { countries } from "../data/countries";
import type { Country } from "../types/country";

/*
 * Data access for the countries feature. UI goes through these functions only.
 * In Phase 2, swap the bodies for API calls; signatures stay the same.
 */

export async function getCountries(): Promise<Country[]> {
  "use cache";
  return countries;
}

export async function getCountryBySlug(slug: string): Promise<Country | null> {
  "use cache";
  return countries.find((country) => country.slug === slug) ?? null;
}

export async function getCountrySlugs(): Promise<string[]> {
  "use cache";
  return countries.map((country) => country.slug);
}

/** Countries where the given trade is listed as in demand. */
export async function getCountriesHiringTrade(tradeSlug: string): Promise<Country[]> {
  "use cache";
  return countries.filter((country) => country.inDemandTradeSlugs.includes(tradeSlug));
}
