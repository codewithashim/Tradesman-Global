import { ArrowRight, UserPlus } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Magnetic } from "@/components/animations";
import { routes } from "@/lib/constants/routes";
import type { Option } from "@/types/common";
import { HeroSearchForm } from "../components/hero-search-form";
import { HeroStage } from "../components/hero-stage";
import { RouteGlobe } from "../components/route-globe";
import type { GlobeData, HomepageStats } from "../types/homepage";

interface HeroSectionProps {
  stats: HomepageStats;
  globe: GlobeData;
  tradeOptions: Option[];
  countryOptions: Option[];
  experienceOptions: Option[];
}

export function HeroSection({ stats, globe, tradeOptions, countryOptions, experienceOptions }: HeroSectionProps) {

  return (
    <section className="px-2 pt-2 sm:px-3 sm:pt-3">
      <HeroStage className="relative isolate overflow-hidden rounded-[2rem] bg-navy-deep text-white sm:rounded-[2.75rem]">
        {/* Light: two soft glows give the dark stage depth without a busy gradient. */}
        <div aria-hidden className="absolute -left-40 -top-40 -z-10 size-[36rem] rounded-full bg-primary/35 blur-[120px]" />
        <div aria-hidden className="absolute -right-24 top-1/3 -z-10 size-[30rem] rounded-full bg-brand-blue/20 blur-[120px]" />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-[0.045] [background-image:linear-gradient(rgb(255_255_255)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_at_30%_30%,black,transparent_70%)]"
        />

        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-5 pb-8 pt-10 sm:px-8 sm:pt-16 lg:grid-cols-12 lg:gap-0 lg:px-10 lg:pb-12 lg:pt-20">
          {/* Copy */}
          <div className="relative z-10 flex flex-col items-start lg:col-span-6 lg:pt-6">
            <p data-hero="kicker" data-anim="hide" className="flex items-center gap-2.5 text-sm font-medium text-white/70">
              <span className="relative flex size-2">
                <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-emerald/70" />
                <span className="relative size-2 rounded-full bg-emerald" />
              </span>
              Profiles from {stats.districts} districts of Bangladesh
            </p>

            <h1
              data-hero="title"
              data-anim="hide"
              className="type-display mt-6 text-[3.1rem] text-balance sm:text-7xl lg:text-[5rem] xl:text-[5.75rem]"
            >
              Bangladesh’s skilled talent. Ready for the world.
            </h1>

            <p data-hero="fade" data-anim="hide" className="mt-6 max-w-md text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
              Real work portfolios, video resumes and experience that speaks for itself.
            </p>

            <div data-hero="fade" data-anim="hide" className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
              <Magnetic>
                <ButtonLink href={routes.findCandidates} size="lg" variant="secondary" className="h-14 w-full bg-white px-7 text-base text-navy ring-0 hover:bg-sky sm:w-auto">
                  Explore skilled workers <ArrowRight />
                </ButtonLink>
              </Magnetic>
              <ButtonLink href={routes.register} size="lg" variant="ghost" className="h-14 px-6 text-base text-white ring-1 ring-white/20 hover:bg-white/10 hover:text-white">
                <UserPlus /> Create free profile
              </ButtonLink>
            </div>

          </div>

          {/* Stage: the globe */}
          <div className="relative -mx-3 sm:mx-auto sm:w-full sm:max-w-xl lg:col-span-6 lg:-mr-12 lg:-mt-6 lg:max-w-none">
            <div data-hero="globe" data-anim="hide">
              <RouteGlobe origin={globe.origin} destinations={globe.destinations} />
            </div>
            <p className="sr-only">
              Routes from {globe.origin.city} to {globe.destinations.map((d) => d.label).join(", ")}.
            </p>
          </div>
        </div>

        {/* Search: the fastest path for an employer who already knows what they need. */}
        <div data-hero="search" data-anim="hide" className="relative mx-auto hidden w-full max-w-7xl px-3 pb-3 sm:block sm:px-8 sm:pb-8 lg:px-10 lg:pb-10">
          <HeroSearchForm tradeOptions={tradeOptions} countryOptions={countryOptions} experienceOptions={experienceOptions} />
        </div>
      </HeroStage>
    </section>
  );
}
