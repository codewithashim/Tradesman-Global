import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight, Search, UserPlus } from "lucide-react";
import { PageTransition } from "@/components/animations";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { SectionIntro } from "@/components/shared/section-intro";
import { CandidateCard, getCandidateCountsByTrade, getSimilarCandidates } from "@/features/candidates";
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

  const [categories, related, hiringCountries, counts, workers] = await Promise.all([
    getTradeCategories(),
    getRelatedTrades(trade),
    getCountriesHiringTrade(trade.slug),
    getCandidateCountsByTrade(),
    getSimilarCandidates("", trade.slug, 3),
  ]);
  const category = categories.find((c) => c.id === trade.categoryId) ?? null;
  const profileCount = counts[trade.slug] ?? 0;

  return (
    <PageTransition>
      <div>
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

        {workers.length > 0 && (
          <section className="flex flex-col gap-8">
            <SectionIntro
              eyebrow={trade.name}
              title="Profiles you can contact."
              action={
                <ButtonLink href={routes.findCandidatesFor({ trade: trade.slug })} variant="secondary">
                  See all {profileCount} <ArrowUpRight />
                </ButtonLink>
              }
            />
            <ul className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 xl:grid-cols-3">
              {workers.map((candidate) => (
                <li key={candidate.id} className="w-[85%] shrink-0 snap-center md:w-auto">
                  <CandidateCard candidate={candidate} />
                </li>
              ))}
            </ul>
          </section>
        )}

        {hiringCountries.length > 0 && (
          <section className="flex flex-col gap-8">
            <SectionIntro eyebrow="Destinations" title={`Where ${trade.name.toLowerCase()}s`} highlight="are in demand." />
            <CountryGrid countries={hiringCountries} />
          </section>
        )}

        {related.length > 0 && (
          <section className="flex flex-col gap-8">
            <SectionIntro eyebrow="Related trades" title={category ? `More in ${category.name}` : "Related trades"} />
            <TradeGrid trades={related} counts={counts} />
          </section>
        )}
      </Container>
      </div>
    </PageTransition>
  );
}
