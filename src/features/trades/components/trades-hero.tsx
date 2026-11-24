import type { ReactNode } from "react";
import Image from "next/image";
import { SplitReveal } from "@/components/animations";
import { siteImages, type SiteImageKey } from "@/config/images";

const columns: SiteImageKey[][] = [
  ["welding", "chef", "hvac", "masonry"],
  ["electrical", "driver", "plumbing", "garments"],
];

interface TradesHeroProps {
  breadcrumbs: ReactNode;
  stats: { label: string; value: number }[];
}

/** Dark stage with two slow, opposing reels of trade photography. */
export function TradesHero({ breadcrumbs, stats }: TradesHeroProps) {
  return (
    <section className="px-2 pt-2 sm:px-3 sm:pt-3">
      <div className="relative isolate overflow-hidden rounded-[2rem] bg-navy-deep text-white sm:rounded-[2.75rem]">
        <div aria-hidden className="absolute -left-40 -top-40 -z-10 size-[34rem] rounded-full bg-primary/35 blur-[120px]" />

        {/* Photo reels (desktop) */}
        <div
          aria-hidden
          className="absolute inset-y-0 right-6 -z-10 hidden w-[30rem] grid-cols-2 gap-4 [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)] lg:grid xl:right-16"
        >
          {columns.map((col, c) => (
            <div key={c} className="overflow-hidden">
              <div className={`flex flex-col gap-4 ${c === 0 ? "animate-[marquee-y_38s_linear_infinite]" : "animate-[marquee-y_44s_linear_infinite_reverse]"}`}>
                {[...col, ...col].map((key, i) => (
                  <div key={i} className="relative aspect-[3/4] shrink-0 overflow-hidden rounded-3xl ring-1 ring-white/10">
                    <Image src={siteImages[key].src} alt="" fill sizes="240px" className="object-cover opacity-85" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div aria-hidden className="absolute inset-0 -z-10 hidden bg-linear-to-r from-navy-deep via-navy-deep/80 to-transparent lg:block" />

        <div className="mx-auto w-full max-w-7xl px-5 pb-12 pt-6 sm:px-8 sm:pb-16 sm:pt-8 lg:min-h-[34rem] lg:px-10">
          <div className="pb-10 sm:pb-14">{breadcrumbs}</div>
          <div className="max-w-2xl">
            <SplitReveal as="h1" play="load" className="type-display text-[2.9rem] text-balance sm:text-7xl lg:text-[5.25rem]">
              Find workers by trade.
            </SplitReveal>
            <p className="mt-5 max-w-lg text-base leading-7 text-white/70 sm:text-lg">
              Every worker lists a primary trade. Pick one to see the skills and certificates that matter, and where those workers want to go.
            </p>
            <dl className="mt-9 flex flex-wrap gap-x-10 gap-y-5">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col-reverse">
                  <dt className="text-xs text-white/55 sm:text-sm">{s.label}</dt>
                  <dd className="type-display text-4xl sm:text-5xl">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
