import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Search, UserPlus } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { SectionIntro } from "@/components/shared/section-intro";
import { getCandidateCountsByTrade } from "@/features/candidates";
import { CountryGrid, getCountriesHiringTrade } from "@/features/countries";
import {
  TradeDetail,
  TradeGrid,
  TradeHero,
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
  return { title: `${trade.name} — skilled Bangladeshi workers`, description: trade.summary };
}

export default async function TradePage({ params }: PageProps<"/trade/[slug]">) {
  const { slug } = await params;
  const trade = await getTradeBySlug(slug);
  if (!trade) notFound();

  const [categories, related, hiringCountries, counts] = await Promise.all([
    getTradeCategories(),
    getRelatedTrades(trade),
    getCountriesHiringTrade(trade.slug),
    getCandidateCountsByTrade(),
  ]);
  const category = categories.find((c) => c.id === trade.categoryId) ?? null;
  const profileCount = counts[trade.slug] ?? 0;

  return (
    <>
      <TradeHero
        trade={trade}
        category={category}
        top={
          <Breadcrumbs
            tone="light"
            items={[{ label: "Home", href: routes.home }, { label: "Trades", href: routes.tradeCategories }, { label: trade.name }]}
          />
        }
        actions={
          <>
            <ButtonLink href={routes.findCandidatesFor({ trade: trade.slug })} size="lg" variant="secondary" className="bg-white text-navy ring-0 hover:bg-sky">
              <Search /> {profileCount > 0 ? `Browse ${profileCount} ${profileCount === 1 ? "profile" : "profiles"}` : "Browse workers"}
            </ButtonLink>
            <ButtonLink href={routes.register} size="lg" variant="ghost" className="text-white ring-1 ring-white/25 hover:bg-white/10">
              <UserPlus /> I’m a {trade.name.toLowerCase()}
            </ButtonLink>
          </>
        }
      />

      <Container className="flex flex-col gap-16 py-12 sm:gap-20 sm:py-16">
        <TradeDetail trade={trade} />

        {hiringCountries.length > 0 && (
          <section className="flex flex-col gap-8">
            <SectionIntro eyebrow="Destinations" title={`Where ${trade.name.toLowerCase()}s`} highlight="are in demand." />
            <CountryGrid countries={hiringCountries} />
          </section>
        )}

        {related.length > 0 && (
          <section className="flex flex-col gap-8">
            <SectionIntro eyebrow="Related trades" title={category ? `More in ${category.name}` : "Related trades"} />
            <TradeGrid trades={related} />
          </section>
        )}
      </Container>
    </>
  );
}
