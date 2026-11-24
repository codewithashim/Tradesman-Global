import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Search } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { SectionHeading } from "@/components/shared/section-heading";
import { CountryDetail, getCountryBySlug, getCountrySlugs } from "@/features/countries";
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
  return { title: `Skilled workers for ${country.name}`, description: country.summary };
}

export default async function CountryPage({ params }: PageProps<"/country/[slug]">) {
  const { slug } = await params;
  const country = await getCountryBySlug(slug);
  if (!country) notFound();

  const inDemandTrades = await getTradesBySlugs(country.inDemandTradeSlugs);

  return (
    <Container className="flex flex-col gap-14 py-10 sm:py-14">
      <div className="flex flex-col gap-8">
        <Breadcrumbs items={[{ label: "Home", href: routes.home }, { label: country.name }]} />
        <CountryDetail country={country} />
        <div>
          <ButtonLink href={routes.findCandidatesFor({ country: country.slug })}>
            <Search aria-hidden className="size-4" />
            Browse candidates for {country.name}
          </ButtonLink>
        </div>
      </div>

      {inDemandTrades.length > 0 && (
        <section className="flex flex-col gap-6">
          <SectionHeading
            title={`In-demand trades in ${country.name}`}
            description="Trades employers in this country hire most often through Tradesman Global."
          />
          <TradeGrid trades={inDemandTrades} />
        </section>
      )}
    </Container>
  );
}
