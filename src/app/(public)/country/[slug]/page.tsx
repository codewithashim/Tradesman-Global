import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Search } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { SectionIntro } from "@/components/shared/section-intro";
import { CountryDetail, CountryHero, getCountryBySlug, getCountrySlugs } from "@/features/countries";
import { TradeGrid, getTradesBySlugs } from "@/features/trades";
import { routes } from "@/lib/constants/routes";

export async function generateStaticParams() {
  const slugs = await getCountrySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/country/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const country = await getCountryBySlug(slug);
  if (!country) return {};
  return { title: `Skilled Bangladeshi workers for ${country.name}`, description: country.summary };
}

export default async function CountryPage({ params }: PageProps<"/country/[slug]">) {
  const { slug } = await params;
  const country = await getCountryBySlug(slug);
  if (!country) notFound();

  const inDemandTrades = await getTradesBySlugs(country.inDemandTradeSlugs);

  return (
    <>
      <CountryHero
        country={country}
        top={
          <Breadcrumbs
            tone="light"
            items={[{ label: "Home", href: routes.home }, { label: "Destinations", href: routes.destinations }, { label: country.name }]}
          />
        }
        actions={
          <ButtonLink
            href={routes.findCandidatesFor({ country: country.slug })}
            size="lg"
            variant="secondary"
            className="w-full bg-white text-navy ring-0 hover:bg-sky sm:w-auto"
          >
            <Search /> Workers open to {country.name}
          </ButtonLink>
        }
      />

      <Container className="flex flex-col gap-16 py-12 sm:gap-20 sm:py-16">
        <CountryDetail country={country} />

        {inDemandTrades.length > 0 && (
          <section className="flex flex-col gap-8">
            <SectionIntro
              eyebrow="In demand"
              title="Trades hiring in"
              highlight={`${country.name}.`}
              description="Trades employers in this country hire most often."
            />
            <TradeGrid trades={inDemandTrades} />
          </section>
        )}
      </Container>
    </>
  );
}
