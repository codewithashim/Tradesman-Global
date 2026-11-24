import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/shared/reveal";
import { SectionIntro } from "@/components/shared/section-intro";
import { routes } from "@/lib/constants/routes";
import { CandidateCard, type Candidate } from "@/features/candidates";
import { SpotlightWorkerCard } from "../components/spotlight-worker-card";

export function FeaturedWorkersSection({ workers }: { workers: Candidate[] }) {
  const [spotlight, ...rest] = workers;
  if (!spotlight) return null;

  return (
    <section className="relative overflow-hidden bg-sky/60 py-16 sm:py-24 lg:py-32">
      <div aria-hidden className="absolute inset-0 bg-dot-grid opacity-70" />
      <Container className="relative flex flex-col gap-12">
        <SectionIntro
          eyebrow="Featured skilled workers"
          title="Talent you can"
          highlight="actually see."
          description="Reviewed profiles with video resumes and photos of real work — so you know what a worker can do before you talk."
          action={
            <ButtonLink href={routes.findCandidates} variant="secondary">
              Browse all workers <ArrowUpRight />
            </ButtonLink>
          }
        />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.15fr_1fr]">
          <Reveal className="h-full">
            <SpotlightWorkerCard worker={spotlight} />
          </Reveal>
          {/* Mobile: swipeable carousel; sm+: 2×2 grid. */}
          <ul className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0">
            {rest.map((worker, index) => (
              <li key={worker.id} className="w-[85%] shrink-0 snap-center sm:w-auto">
                <Reveal delay={index * 90} className="h-full">
                  <CandidateCard candidate={worker} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
