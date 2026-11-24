import { Building2, Info } from "lucide-react";
import type { Country } from "../types/country";
import { CountryCodeMark } from "./country-code-mark";

/** Hero, quick facts, sectors and employment notes for one country. */
export function CountryDetail({ country }: { country: Country }) {
  const facts = [
    { label: "Region", value: country.region },
    { label: "Capital", value: country.capital },
    { label: "Currency", value: country.currency },
  ];

  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <CountryCodeMark isoCode={country.isoCode} size="lg" />
        <div className="max-w-3xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Destination country</p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{country.name}</h1>
          <p className="mt-4 text-base leading-7 text-muted-foreground text-pretty">{country.overview}</p>
        </div>
      </header>

      <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
        {facts.map((fact) => (
          <div key={fact.label} className="bg-card p-5">
            <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{fact.label}</dt>
            <dd className="mt-1 font-semibold">{fact.value}</dd>
          </div>
        ))}
      </dl>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <section className="rounded-xl border border-border bg-card p-6">
          <h2 className="flex items-center gap-2 font-semibold">
            <Building2 aria-hidden className="size-4" />
            Key hiring sectors
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {country.keySectors.map((sector) => (
              <li key={sector} className="rounded-md bg-muted px-3 py-1.5 text-sm">
                {sector}
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-xl border border-border bg-card p-6">
          <h2 className="flex items-center gap-2 font-semibold">
            <Info aria-hidden className="size-4" />
            Good to know
          </h2>
          <ul className="mt-4 flex list-disc flex-col gap-2 pl-5 text-sm leading-6 text-muted-foreground marker:text-primary">
            {country.employmentNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted-foreground">
            General guidance only. Visa and permit rules change — confirm current requirements with official sources.
          </p>
        </section>
      </div>
    </div>
  );
}
