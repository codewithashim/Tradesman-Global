/**
 * Plain navigation data the site shell renders. Supplied by the route layout
 * (from the trades / countries features) so the shell stays feature-agnostic.
 */
export interface NavLink {
  label: string;
  href: string;
  /** Short helper line (menus) or badge text (e.g. ISO code). */
  hint?: string;
}

export interface SiteNavData {
  /** Highlighted trades for menus and footer. */
  trades: NavLink[];
  /** All destination countries. `hint` = ISO code. */
  countries: NavLink[];
  /** Total number of trades, for "All N trades" links. */
  tradeCount: number;
}
