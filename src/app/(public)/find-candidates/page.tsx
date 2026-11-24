import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { PageIntro } from "@/components/shared/page-intro";
import { CandidateDirectory, CandidateDirectorySkeleton } from "@/features/candidates";
import { getCountries } from "@/features/countries";
import { getTrades } from "@/features/trades";
import { routes } from "@/lib/constants/routes";

export const metadata: Metadata = {
  title: "Find skilled workers",
  description: "Search reviewed Bangladeshi skilled workers by trade, destination country, experience and availability.",
};

export default async function FindCandidatesPage({ searchParams }: PageProps<"/find-candidates">) {
  // Cached, URL-independent data: part of the static shell.
  const [trades, countries] = await Promise.all([getTrades(), getCountries()]);
  const tradeOptions = trades.map((trade) => ({ value: trade.slug, label: trade.name }));
  const countryOptions = countries.map((country) => ({ value: country.slug, label: country.name }));

  return (
    <>
      <PageIntro
        breadcrumbs={<Breadcrumbs items={[{ label: "Home", href: routes.home }, { label: "Find workers" }]} />}
        eyebrow="Candidate directory"
        title="Find skilled workers"
        highlight="you can trust."
        description="Every profile is reviewed by our team before it’s listed. Search by skill, then narrow by trade, destination country, experience and availability."
      />
      <Container className="relative z-10 -mt-10 pb-24 sm:-mt-12">
        {/* searchParams is request-time data: resolve it inside Suspense so the shell above prerenders. */}
        <Suspense fallback={<CandidateDirectorySkeleton />}>
          <CandidateDirectory searchParams={searchParams} tradeOptions={tradeOptions} countryOptions={countryOptions} />
        </Suspense>
      </Container>
    </>
  );
}
