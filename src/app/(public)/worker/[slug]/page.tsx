import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";
import { PageTransition } from "@/components/animations";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { SectionIntro } from "@/components/shared/section-intro";
import { CandidateCard, getSimilarCandidates } from "@/features/candidates";
import { CountryFlag, getCountries } from "@/features/countries";
import { WorkerProfileView, getPublicWorkerSlugs, getWorkerProfileBySlug } from "@/features/workers";
import { routes } from "@/lib/constants/routes";

export async function generateStaticParams() {
  const slugs = await getPublicWorkerSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/worker/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const worker = await getWorkerProfileBySlug(slug);
  if (!worker) return {};
  return { title: `${worker.fullName} — ${worker.trade.name}`, description: worker.headline };
}

export default async function WorkerPage({ params }: PageProps<"/worker/[slug]">) {
  const { slug } = await params;
  const worker = await getWorkerProfileBySlug(slug);
  if (!worker) notFound();

  const [similar, countries] = await Promise.all([getSimilarCandidates(worker.id, worker.trade.slug), getCountries()]);
  // Join: workers reference countries by slug; the route supplies the flag artwork.
  const destinationFlags = Object.fromEntries(countries.map((c) => [c.slug, <CountryFlag key={c.slug} code={c.isoCode} className="w-full" />]));

  return (
    <PageTransition>
      {/* Bottom padding on mobile clears the sticky "Contact Admin" bar. */}
      <div className="pb-20 lg:pb-0">
        <WorkerProfileView
          worker={worker}
          destinationFlags={destinationFlags}
          breadcrumbs={
            <Breadcrumbs
              tone="light"
              items={[{ label: "Home", href: routes.home }, { label: "Find workers", href: routes.findCandidates }, { label: worker.fullName }]}
            />
          }
        />

        {similar.length > 0 && (
          <section className="py-16 sm:py-24">
            <Container className="flex flex-col gap-10">
              <SectionIntro
                eyebrow="Keep exploring"
                title={`More ${worker.trade.name.toLowerCase()}s.`}
                action={
                  <ButtonLink href={routes.findCandidatesFor({ trade: worker.trade.slug })} variant="secondary">
                    See all <ArrowUpRight />
                  </ButtonLink>
                }
              />
              <ul className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 xl:grid-cols-3">
                {similar.map((candidate) => (
                  <li key={candidate.id} className="w-[85%] shrink-0 snap-center md:w-auto">
                    <CandidateCard candidate={candidate} />
                  </li>
                ))}
              </ul>
            </Container>
          </section>
        )}
      </div>
    </PageTransition>
  );
}
