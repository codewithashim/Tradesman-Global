import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { SectionIntro } from "@/components/shared/section-intro";
import { CandidateCard, getSimilarCandidates } from "@/features/candidates";
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

  const similar = await getSimilarCandidates(worker.id, worker.trade.slug);

  return (
    // Bottom padding on mobile clears the sticky "Contact Admin" bar.
    <div className="pb-24 lg:pb-0">
      <Container className="flex flex-col gap-6 pb-20 pt-8 sm:pt-10">
        <Breadcrumbs
          items={[
            { label: "Home", href: routes.home },
            { label: "Find workers", href: routes.findCandidates },
            { label: worker.fullName },
          ]}
        />
        <WorkerProfileView worker={worker} />
      </Container>

      {similar.length > 0 && (
        <section className="bg-sky/60 py-20">
          <Container className="flex flex-col gap-10">
            <SectionIntro
              eyebrow="Keep exploring"
              title={`Similar ${worker.trade.name.toLowerCase()}s`}
              action={
                <ButtonLink href={routes.findCandidatesFor({ trade: worker.trade.slug })} variant="secondary">
                  See all <ArrowUpRight />
                </ButtonLink>
              }
            />
            <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {similar.map((candidate) => (
                <li key={candidate.id}>
                  <CandidateCard candidate={candidate} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}
    </div>
  );
}
