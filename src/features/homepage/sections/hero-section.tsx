import Image from "next/image";
import { ArrowRight, Play, UserPlus } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Magnetic } from "@/components/animations";
import { siteImages } from "@/config/images";
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

/** Skills that drift around the globe: the kind of detail a profile shows. */
const skillTags = [
  { label: "6G pipe welding", className: "right-[4%] top-[4%]" },
  { label: "3-phase wiring", className: "right-[0%] bottom-[22%]" },
  { label: "Tile setting", className: "left-[46%] bottom-[2%] max-sm:hidden" },
];

export function HeroSection({ stats, globe, tradeOptions, countryOptions, experienceOptions }: HeroSectionProps) {
  const photo = siteImages.heroWorker;

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

            <p data-hero="fade" data-anim="hide" lang="bn" className="mt-6 text-sm text-white/50">
              আপনার দক্ষতা দেখান বিশ্বকে — প্রোফাইল তৈরি সম্পূর্ণ ফ্রি।
            </p>
          </div>

          {/* Stage: globe, photo, video preview, drifting skills */}
          <div className="relative -mx-3 sm:mx-auto sm:w-full sm:max-w-xl lg:col-span-6 lg:-mr-20 lg:-mt-8 lg:max-w-none">
            <div data-hero="globe" data-anim="hide">
              <RouteGlobe origin={globe.origin} destinations={globe.destinations} />
            </div>
            <p className="sr-only">
              Routes from {globe.origin.label} to {globe.destinations.map((d) => d.label).join(", ")}.
            </p>

            <figure
              data-hero="photo"
              data-anim="hide"
              className="absolute bottom-[2%] left-[4%] w-[33%] overflow-hidden rounded-[1.25rem] shadow-2xl shadow-black/40 ring-1 ring-white/15 sm:rounded-3xl lg:bottom-[6%] lg:left-[-2%] lg:w-[32%]"
            >
              <div className="relative aspect-[3/4]">
                <Image src={photo.src} alt={photo.alt} fill priority sizes="(min-width: 1024px) 15rem, 38vw" className="object-cover object-[50%_62%]" />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-deep/85 via-transparent to-transparent" />
                <figcaption className="absolute inset-x-3 bottom-3 flex items-center gap-2 text-left sm:inset-x-4 sm:bottom-4">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white text-primary sm:size-9">
                    <Play aria-hidden className="ml-0.5 size-3.5 sm:size-4" fill="currentColor" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] font-semibold leading-tight sm:text-xs">Video resume</span>
                    <span className="block text-[10px] text-white/60 sm:text-[11px]">Skills on camera</span>
                  </span>
                </figcaption>
              </div>
            </figure>

            <ul aria-hidden className="pointer-events-none">
              {skillTags.map((tag, i) => (
                <li
                  key={tag.label}
                  data-hero="tag"
                  data-anim="hide"
                  className={`absolute ${tag.className}`}
                >
                  <span
                    style={{ animationDelay: `${i * 1.6}s` }}
                    className="flex animate-float items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white ring-1 ring-white/20 backdrop-blur-md"
                  >
                    <span className="size-1.5 rounded-full bg-emerald" />
                    {tag.label}
                  </span>
                </li>
              ))}
            </ul>
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
