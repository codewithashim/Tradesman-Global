import { PublicLayout } from "@/components/layouts/public-layout";
import type { SiteNavData } from "@/components/layouts/nav-types";
import { getCountries } from "@/features/countries";
import { getTrades } from "@/features/trades";
import { routes } from "@/lib/constants/routes";

/** Trades highlighted in the header menu and footer, in display order. */
const HIGHLIGHTED_TRADES = [
  "welder",
  "electrician",
  "plumber",
  "hvac-technician",
  "mason",
  "chef",
  "heavy-vehicle-driver",
  "garments-machine-operator",
];

export default async function Layout({ children }: LayoutProps<"/">) {
  // Cached service calls — part of the static shell.
  const [trades, countries] = await Promise.all([getTrades(), getCountries()]);

  const nav: SiteNavData = {
    trades: HIGHLIGHTED_TRADES.flatMap((slug) => {
      const trade = trades.find((t) => t.slug === slug);
      return trade ? [{ label: trade.name, href: routes.trade(trade.slug), hint: trade.summary }] : [];
    }),
    countries: countries.map((c) => ({ label: c.name, href: routes.country(c.slug), hint: c.isoCode })),
    tradeCount: trades.length,
  };

  return <PublicLayout nav={nav}>{children}</PublicLayout>;
}
