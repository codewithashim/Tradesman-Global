import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Search } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { SectionHeading } from "@/components/shared/section-heading";
import { CountryGrid, getCountriesHiringTrade } from "@/features/countries";
import {
  TradeDetail,
  TradeGrid,
  getRelatedTrades,
  getTradeBySlug,
  getTradeCategories,
  getTradeSlugs,
} from "@/features/trades";
import { routes } from "@/lib/constants/routes";

export async function generateStaticParams() {
  const slugs = await getTradeSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/trade/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const trade = await getTradeBySlug(slug);
  if (!trade) return {};
  return { title: `${trade.name}s for overseas hire`, description: trade.summary };
}

export default async function TradePage({ params }: PageProps<"/trade/[slug]">) {
  const { slug } = await params;
  const trade = await getTradeBySlug(slug);
  if (!trade) notFound();

  const [categories, related, hiringCountries] = await Promise.all([
    getTradeCategories(),
    getRelatedTrades(trade),
    getCountriesHiringTrade(trade.slug),
  ]);
  const category = categories.find((c) => c.id === trade.categoryId) ?? null;

  return (
    <Container className="flex flex-col gap-14 py-10 sm:py-14">
      <div className="flex flex-col gap-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: routes.home },
            { label: "Trades", href: routes.tradeCategories },
            { label: trade.name },
          ]}
        />
        <TradeDetail trade={trade} category={category} />
        <div>
          <ButtonLink href={routes.findCandidatesFor({ trade: trade.slug })}>
            <Search aria-hidden className="size-4" />
            Browse {trade.name.toLowerCase()} candidates
          </ButtonLink>
        </div>
      </div>

      {hiringCountries.length > 0 && (
        <section className="flex flex-col gap-6">
          <SectionHeading title={`Where ${trade.name.toLowerCase()}s are in demand`} />
          <CountryGrid countries={hiringCountries} />
        </section>
      )}

      {related.length > 0 && (
        <section className="flex flex-col gap-6">
          <SectionHeading title={category ? `More in ${category.name}` : "Related trades"} />
          <TradeGrid trades={related} />
        </section>
      )}
    </Container>
  );
}
