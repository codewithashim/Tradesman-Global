import type { ReactNode } from "react";
import { Building2, Coins, Globe2, Info, Landmark } from "lucide-react";
import type { Country } from "../types/country";

/** Navy hero with ISO watermark for a destination country. */
export function CountryHero({ country, top, actions }: { country: Country; top?: ReactNode; actions?: ReactNode }) {
  return (
    <section className="px-3 pt-3 sm:px-4">
      <div className="relative isolate overflow-hidden rounded-[2rem] bg-navy-deep text-white sm:rounded-[2.5rem]">
        <div aria-hidden className="absolute -left-32 -top-32 -z-10 size-[30rem] rounded-full bg-primary/40 blur-[100px]" />
        <div aria-hidden className="absolute -bottom-40 right-0 -z-10 size-[26rem] rounded-full bg-brand-blue/25 blur-[100px]" />
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-8 -right-4 -z-10 select-none text-[11rem] font-extrabold leading-none tracking-tighter text-white/[0.06] sm:text-[18rem]"
        >
          {country.isoCode}
        </span>

        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 pb-10 pt-6 sm:px-6 sm:pb-14 sm:pt-8 lg:px-8">
          {top && <div className="pb-4">{top}</div>}
          <span className="w-fit rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-blue ring-1 ring-white/15">
            Destination · {country.region}
          </span>
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-balance sm:text-6xl">{country.name}</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">{country.overview}</p>
          </div>
          {actions && <div className="flex flex-col gap-3 sm:flex-row">{actions}</div>}
        </div>
      </div>
    </section>
  );
}

/** Quick facts, sectors and employment notes. */
export function CountryDetail({ country }: { country: Country }) {
  const facts = [
    { label: "Region", value: country.region, icon: Globe2 },
    { label: "Capital", value: country.capital, icon: Landmark },
    { label: "Currency", value: country.currency, icon: Coins },
  ];

  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {facts.map(({ label, value, icon: Icon }) => (
          <div key={label} className="flex items-center gap-4 rounded-3xl bg-card p-5 shadow-soft ring-1 ring-border/70">
            <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-sky text-primary">
              <Icon aria-hidden className="size-5" />
            </span>
            <div className="min-w-0">
              <dt className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">{label}</dt>
              <dd className="mt-0.5 truncate font-bold text-navy">{value}</dd>
            </div>
          </div>
        ))}
      </dl>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
        <section className="rounded-[2rem] bg-card p-6 shadow-soft ring-1 ring-border/70 sm:p-8">
          <h2 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
            <Building2 aria-hidden className="size-4 text-primary" />
            Key hiring sectors
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {country.keySectors.map((sector) => (
              <li key={sector} className="rounded-full bg-primary/10 px-3.5 py-1.5 text-sm font-semibold text-primary">
                {sector}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-[2rem] bg-sky/70 p-6 ring-1 ring-primary/10 sm:p-8">
          <h2 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
            <Info aria-hidden className="size-4 text-primary" />
            Good to know
          </h2>
          <ul className="mt-4 flex flex-col gap-3">
            {country.employmentNotes.map((note) => (
              <li key={note} className="flex gap-3 text-sm leading-6 text-navy">
                <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                {note}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs leading-5 text-muted-foreground">
            General guidance only. Visa and permit rules change — confirm current requirements with official sources.
          </p>
        </section>
      </div>
    </div>
  );
}
