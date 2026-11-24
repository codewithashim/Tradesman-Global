import { MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import type { Option } from "@/types/common";
import { HeroSearchForm } from "../components/hero-search-form";
import { featuredDistricts } from "../data/homepage-content";
import type { HomepageStats } from "../types/homepage";

interface SearchSectionProps {
  tradeOptions: Option[];
  countryOptions: Option[];
  experienceOptions: Option[];
  stats: HomepageStats;
}

/** Floating search card overlapping the hero, with district strip and live counts. */
export function SearchSection({ tradeOptions, countryOptions, experienceOptions, stats }: SearchSectionProps) {
  const statItems = [
    { value: stats.profiles, label: "Reviewed profiles" },
    { value: stats.trades, label: "Trades" },
    { value: stats.destinations, label: "Destination countries" },
    { value: stats.districts, label: "Home districts" },
  ];

  return (
    <section aria-label="Search workers" className="relative z-10 -mt-24 lg:-mt-28">
      <Container className="flex flex-col gap-6">
        <HeroSearchForm tradeOptions={tradeOptions} countryOptions={countryOptions} experienceOptions={experienceOptions} />

        <div className="overflow-hidden rounded-3xl bg-card/70 px-2 py-5 ring-1 ring-border/60 backdrop-blur">
          <p className="mb-3 text-center text-xs text-muted-foreground">
            Workers from <strong className="font-semibold text-navy">districts across Bangladesh</strong>
          </p>
          {/* Marquee: duplicated list scrolls seamlessly; edges fade out. */}
          <div className="relative [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
            <ul className="flex w-max animate-marquee gap-10 hover:[animation-play-state:paused]">
              {[...featuredDistricts, ...featuredDistricts].map((district, i) => (
                <li
                  key={`${district}-${i}`}
                  aria-hidden={i >= featuredDistricts.length}
                  className="flex items-center gap-1.5 text-sm font-semibold text-navy/45"
                >
                  <MapPin className="size-4 text-primary/60" aria-hidden />
                  {district}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {statItems.map((item) => (
            <div key={item.label} className="flex flex-col-reverse rounded-2xl bg-card px-5 py-4 shadow-soft ring-1 ring-border/60">
              <dt className="mt-0.5 text-sm text-muted-foreground">{item.label}</dt>
              <dd className="text-3xl font-extrabold tracking-tight text-navy">
                <AnimatedCounter value={item.value} />
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
