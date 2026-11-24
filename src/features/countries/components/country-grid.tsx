import type { Country } from "../types/country";
import { CountryCard } from "./country-card";

/** Swipeable row on phones; grid from md up. */
export function CountryGrid({ countries }: { countries: Country[] }) {
  return (
    <ul className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:-mx-6 sm:px-6 md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-4">
      {countries.map((country) => (
        <li key={country.slug} className="w-[78%] shrink-0 snap-start sm:w-[45%] md:w-auto">
          <CountryCard country={country} />
        </li>
      ))}
    </ul>
  );
}
