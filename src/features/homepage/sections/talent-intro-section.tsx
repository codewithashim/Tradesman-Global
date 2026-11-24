import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Parallax, ScrollWords } from "@/components/animations";
import { siteImages } from "@/config/images";
import type { HomepageStats } from "../types/homepage";

/**
 * Editorial bridge from the hero: one statement, two photographs, three
 * figures — the "why" of the platform before the browsing starts.
 */
export function TalentIntroSection({ stats }: { stats: HomepageStats }) {
  const wide = siteImages.onSite;
  const tall = siteImages.siteAerial;

  return (
    <section className="relative overflow-hidden py-20 sm:py-28 lg:py-36">
      <Container>
        <ScrollWords
          as="h2"
          className="type-display max-w-5xl text-[2.1rem] leading-[1.05] text-navy sm:text-5xl lg:text-[4.25rem]"
          text="Welders who built refineries. Electricians who wired towers. Masons, chefs and drivers with years on the job — and, until now, no way to show it."
        />

        <div className="mt-14 grid grid-cols-12 gap-3 sm:mt-20 sm:gap-5">
          {/* Wide site photo with figures laid over it */}
          <div className="relative col-span-12 overflow-hidden rounded-[1.75rem] lg:col-span-8 lg:rounded-[2.25rem]">
            <div className="relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-auto lg:h-full lg:min-h-[32rem]">
              {/* Oversized so the parallax drift never exposes an edge. */}
              <Parallax speed={-14} className="absolute inset-x-0 -inset-y-[12%]">
                <Image src={wide.src} alt={wide.alt} fill sizes="(min-width: 1024px) 66vw, 100vw" className="object-cover" />
              </Parallax>
            </div>
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/20 to-transparent" />
            <dl className="absolute inset-x-5 bottom-5 grid grid-cols-3 gap-3 text-white sm:inset-x-8 sm:bottom-8 sm:gap-8">
              <Figure value={stats.profiles} label="reviewed profiles" />
              <Figure value={stats.trades} label="skilled trades" />
              <Figure value={stats.districts} label="home districts" />
            </dl>
          </div>

          {/* Tall photo + note, offset to break the grid */}
          <div className="col-span-12 grid grid-cols-2 gap-3 sm:gap-5 lg:col-span-4 lg:grid-cols-1 lg:pt-24">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[1.75rem] lg:aspect-[4/5] lg:rounded-[2.25rem]">
              <Image src={tall.src} alt={tall.alt} fill sizes="(min-width: 1024px) 30vw, 50vw" className="object-cover" />
            </div>
            <div className="flex flex-col justify-end gap-3 rounded-[1.75rem] bg-navy p-5 text-white sm:p-6 lg:justify-start">
              <p className="text-base font-semibold leading-snug sm:text-lg">
                Every profile is checked by our team before employers can see it.
              </p>
              <p lang="bn" className="text-sm text-white/60">
                প্রতিটি প্রোফাইল প্রকাশের আগে যাচাই করা হয়।
              </p>
            </div>
          </div>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">Figures are from the demo directory.</p>
      </Container>
    </section>
  );
}

function Figure({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col-reverse">
      <dt className="mt-1 text-xs text-white/70 sm:text-sm">{label}</dt>
      <dd className="type-display text-4xl sm:text-6xl lg:text-7xl">{value}</dd>
    </div>
  );
}
