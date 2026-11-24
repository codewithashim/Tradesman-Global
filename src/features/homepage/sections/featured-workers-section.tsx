import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";
import { SectionIntro } from "@/components/shared/section-intro";
import { routes } from "@/lib/constants/routes";
import { CandidateCard, type Candidate } from "@/features/candidates";
import { SpotlightWorkerCard } from "../components/spotlight-worker-card";

export function FeaturedWorkersSection({ workers }: { workers: Candidate[] }) {
  const [spotlight, ...rest] = workers;
  if (!spotlight) return null;

  return (
    <section className="relative overflow-hidden py-20 sm:py-28 lg:py-32">
      <Container className="relative flex flex-col gap-12">
        <SectionIntro
          eyebrow="Featured workers"
          title="Talent you can actually see."
          description="Video resumes and photos of real work, so you know what a worker can do before you talk."
          action={
            <ButtonLink href={routes.findCandidates} variant="secondary">
              Browse all workers <ArrowUpRight />
            </ButtonLink>
          }
        />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.15fr_1fr]">
          <SpotlightWorkerCard worker={spotlight} />
          {/* Mobile: swipeable carousel; sm+: 2×2 grid. */}
          <ul className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0">
            {rest.map((worker) => (
              <li key={worker.id} className="w-[85%] shrink-0 snap-center sm:w-auto">
                <CandidateCard candidate={worker} />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
