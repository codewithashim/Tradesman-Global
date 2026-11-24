import { PublicLayout } from "@/components/layouts/public-layout";
import { getCountries } from "@/features/countries";
import { getTrades } from "@/features/trades";
import { routes } from "@/lib/constants/routes";

const FOOTER_TRADES = ["welder", "electrician", "plumber", "hvac-technician", "mason", "chef"];

export default async function Layout({ children }: LayoutProps<"/">) {
  // Cached service calls — part of the static shell.
  const [trades, countries] = await Promise.all([getTrades(), getCountries()]);

  const footerTradeLinks = trades
    .filter((trade) => FOOTER_TRADES.includes(trade.slug))
    .map((trade) => ({ label: trade.name, href: routes.trade(trade.slug) }));
  const footerCountryLinks = countries.map((country) => ({ label: country.name, href: routes.country(country.slug) }));

  return (
    <PublicLayout footerTradeLinks={footerTradeLinks} footerCountryLinks={footerCountryLinks}>
      {children}
    </PublicLayout>
  );
}
