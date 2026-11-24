import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { routes } from "@/lib/constants/routes";
import type { Country } from "../types/country";
import { CountryCodeMark } from "./country-code-mark";

export function CountryCard({ country }: { country: Country }) {
  return (
    <Link
      href={routes.country(country.slug)}
      className="group flex h-full flex-col gap-4 rounded-xl border border-border bg-card p-5 transition hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <CountryCodeMark isoCode={country.isoCode} />
          <div>
            <h3 className="font-semibold leading-tight">{country.name}</h3>
            <p className="text-xs text-muted-foreground">{country.region}</p>
          </div>
        </div>
        <ArrowUpRight
          aria-hidden
          className="size-4 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
        />
      </div>
      <p className="flex-1 text-sm leading-6 text-muted-foreground">{country.summary}</p>
      <p className="text-xs font-medium text-muted-foreground">
        {country.inDemandTradeSlugs.length} trades in demand
      </p>
    </Link>
  );
}
