export type CountryRegion = "Middle East" | "Europe" | "Asia-Pacific";

export interface Country {
  slug: string;
  name: string;
  /** ISO 3166-1 alpha-2, e.g. "AE". */
  isoCode: string;
  region: CountryRegion;
  capital: string;
  currency: string;
  /** One line, used on cards. */
  summary: string;
  /** Longer copy for the country page. */
  overview: string;
  /** Major sectors currently hiring tradespeople. */
  keySectors: string[];
  /**
   * References trades by slug only, so the countries feature never depends on
   * the trades feature. Route pages resolve slugs via the trades public API.
   */
  inDemandTradeSlugs: string[];
  /** General points employers and workers should know. Not legal advice. */
  employmentNotes: string[];
}
