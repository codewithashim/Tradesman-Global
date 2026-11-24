import Link from "next/link";
import { ArrowUpRight, Plane } from "lucide-react";
import { routes } from "@/lib/constants/routes";
import type { Country } from "../types/country";

/** Destination card with an oversized ISO-code watermark (flag emoji render inconsistently). */
export function CountryCard({ country }: { country: Country }) {
  return (
    <Link
      href={routes.country(country.slug)}
      className="group relative flex h-full min-h-52 flex-col overflow-hidden rounded-3xl bg-card p-5 shadow-soft ring-1 ring-border/70 transition duration-300 hover:-translate-y-1 hover:shadow-float focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/60 active:scale-[0.98] sm:p-6"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-3 -right-1 select-none text-[4.5rem] font-extrabold leading-none tracking-tighter text-sky/80 transition group-hover:text-primary/10"
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

      <h3 className="relative mt-5 text-xl font-bold tracking-tight text-navy">{country.name}</h3>
      <p className="relative mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{country.summary}</p>
      <p className="relative mt-auto flex items-center gap-1.5 pt-5 text-sm font-semibold text-navy">
        <Plane aria-hidden className="size-4 text-primary" /> {country.inDemandTradeSlugs.length} trades in demand
      </p>
    </Link>
  );
}
