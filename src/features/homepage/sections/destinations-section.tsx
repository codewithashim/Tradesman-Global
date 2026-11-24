import Link from "next/link";
import { ArrowUpRight, Plane } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/shared/reveal";
import { SectionIntro } from "@/components/shared/section-intro";
import { routes } from "@/lib/constants/routes";
import type { DestinationSummary } from "../types/homepage";

export function DestinationsSection({ destinations }: { destinations: DestinationSummary[] }) {
  return (
    <section id="destinations" className="scroll-mt-24 bg-sky/60 py-24 sm:py-32">
      <Container className="flex flex-col gap-12">
        <SectionIntro
          eyebrow="Destination countries"
          title="Where Bangladeshi skills"
          highlight="are in demand."
          description="Workers choose the countries they’re open to. Explore what each destination is hiring for."
        />
      </Container>

      {/* Horizontal scroller on mobile, grid from md up. */}
      <Container className="max-md:px-0">
        <ul className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] md:grid md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-4">
          {destinations.map((country, i) => (
            <li key={country.slug} className="w-[78%] shrink-0 snap-start sm:w-[45%] md:w-auto">
              <Reveal delay={(i % 4) * 70} className="h-full">
                <DestinationCard country={country} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function DestinationCard({ country }: { country: DestinationSummary }) {
  return (
    <Link
      href={routes.country(country.slug)}
      className="group relative flex h-full min-h-56 flex-col overflow-hidden rounded-3xl bg-card p-6 shadow-soft ring-1 ring-border/70 transition duration-300 hover:-translate-y-1 hover:shadow-float focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/60"
    >
      {/* Oversized ISO watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-3 -right-1 select-none text-[4.5rem] font-extrabold leading-none tracking-tighter text-sky/70 transition group-hover:text-primary/10"
      >
        {country.isoCode}
      </span>

      <div className="relative flex items-center justify-between">
        <span className="rounded-full bg-sky px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
          {country.region}
        </span>
        <span className="grid size-9 place-items-center rounded-full bg-navy text-white transition group-hover:rotate-45 group-hover:bg-primary">
          <ArrowUpRight aria-hidden className="size-4" />
        </span>
      </div>

      <h3 className="relative mt-6 text-xl font-bold tracking-tight text-navy">{country.name}</h3>
      <p className="relative mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{country.summary}</p>
      <p className="relative mt-auto flex items-center gap-1.5 pt-5 text-sm font-semibold text-navy">
        <Plane aria-hidden className="size-4 text-primary" /> {country.tradeCount} trades in demand
      </p>
    </Link>
  );
}
