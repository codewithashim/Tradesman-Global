import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/container";
import { PageTransition } from "@/components/animations";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { CandidateDirectory, CandidateDirectoryHero, CandidateDirectorySkeleton, getDirectoryStats } from "@/features/candidates";
import { CountryFlag, getCountries } from "@/features/countries";
import { getTrades } from "@/features/trades";
import { routes } from "@/lib/constants/routes";

export const metadata: Metadata = {
  title: "Find skilled workers",
  description: "Search reviewed Bangladeshi skilled workers by trade, destination country, experience and availability.",
};

export default async function FindCandidatesPage({ searchParams }: PageProps<"/find-candidates">) {
  // Cached, URL-independent data: part of the static shell.
  const [trades, countries, stats] = await Promise.all([getTrades(), getCountries(), getDirectoryStats()]);
  const tradeOptions = trades.map((trade) => ({ value: trade.slug, label: trade.name }));
  const countryOptions = countries.map((country) => ({ value: country.slug, label: country.name }));
  const countryFlags = Object.fromEntries(countries.map((c) => [c.slug, <CountryFlag key={c.slug} code={c.isoCode} className="w-full" />]));

  return (
    <PageTransition>
      <div>
        <CandidateDirectoryHero
          stats={stats}
          breadcrumbs={<Breadcrumbs tone="light" items={[{ label: "Home", href: routes.home }, { label: "Find workers" }]} />}
        />
        <Container className="relative z-10 -mt-14 pb-24 sm:-mt-16">
          {/* searchParams is request-time data: resolve it inside Suspense so the shell above prerenders. */}
          <Suspense fallback={<CandidateDirectorySkeleton />}>
            <CandidateDirectory searchParams={searchParams} tradeOptions={tradeOptions} countryOptions={countryOptions} countryFlags={countryFlags} />
          </Suspense>
        </Container>
      </div>
    </PageTransition>
  );
}
