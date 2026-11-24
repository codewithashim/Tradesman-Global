import type { ReactNode } from "react";
import Image from "next/image";
import { SplitReveal } from "@/components/animations";
import { siteImages, type SiteImageKey } from "@/config/images";

interface CandidateDirectoryHeroProps {
  breadcrumbs: ReactNode;
  stats: { profiles: number; withVideo: number; districts: number };
}

/** A fanned stack of trade photos: the directory is people with real work behind them. */
const stack: { key: SiteImageKey; className: string }[] = [
  { key: "masonry", className: "right-[34%] top-24 rotate-[-9deg]" },
  { key: "electrical", className: "right-[17%] top-16 rotate-[4deg]" },
  { key: "welding", className: "right-0 top-28 rotate-[12deg]" },
];

/** Dark stage at the top of the directory; the search bar overlaps its lower edge. */
export function CandidateDirectoryHero({ breadcrumbs, stats }: CandidateDirectoryHeroProps) {
  const figures = [
    { value: stats.profiles, label: "reviewed profiles" },
    { value: stats.withVideo, label: "with video resumes" },
    { value: stats.districts, label: "home districts" },
  ];

  return (
    <section className="px-2 pt-2 sm:px-3 sm:pt-3">
      <div className="relative isolate overflow-hidden rounded-[2rem] bg-navy-deep text-white sm:rounded-[2.75rem]">
        <div aria-hidden className="absolute -left-32 -top-40 -z-10 size-[34rem] rounded-full bg-primary/35 blur-[120px]" />
        <div aria-hidden className="absolute -bottom-40 right-10 -z-10 size-[28rem] rounded-full bg-brand-blue/20 blur-[120px]" />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-[0.045] [background-image:linear-gradient(rgb(255_255_255)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_20%_20%,black,transparent_70%)]"
        />

        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-5 pb-24 pt-6 sm:px-8 sm:pb-28 sm:pt-8 lg:grid-cols-12 lg:px-10">
          <div className="lg:col-span-7">
            <div className="pb-8 sm:pb-12">{breadcrumbs}</div>
            <SplitReveal as="h1" play="load" className="type-display text-[2.9rem] text-balance sm:text-7xl lg:text-[5.25rem]">
              Find skilled workers you can see.
            </SplitReveal>
            <p className="mt-5 max-w-lg text-base leading-7 text-white/70 sm:text-lg">
              Every profile is reviewed before it’s listed. Search by skill, then narrow by trade, country and experience.
            </p>

            <dl className="mt-9 flex flex-wrap gap-x-10 gap-y-5">
              {figures.map((f) => (
                <div key={f.label} className="flex flex-col-reverse">
                  <dt className="text-xs text-white/55 sm:text-sm">{f.label}</dt>
                  <dd className="type-display text-4xl sm:text-5xl">{f.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-[11px] text-white/35">Figures from the demo directory.</p>
          </div>

          <div aria-hidden className="relative hidden lg:col-span-5 lg:block">
            {stack.map(({ key, className }, i) => (
              <div
                key={key}
                style={{ animationDelay: `${i * 1.4}s` }}
                className={`absolute aspect-[3/4] w-48 animate-float overflow-hidden rounded-3xl shadow-2xl shadow-black/40 ring-4 ring-white/10 ${className}`}
              >
                <Image src={siteImages[key].src} alt="" fill sizes="192px" className="object-cover" />
                <div className="absolute inset-0 bg-linear-to-t from-navy-deep/60 to-transparent" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
