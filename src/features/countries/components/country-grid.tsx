import type { Country } from "../types/country";
import { CountryCard } from "./country-card";

export function CountryGrid({ countries }: { countries: Country[] }) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {countries.map((country) => (
        <li key={country.slug}>
          <CountryCard country={country} />
        </li>
      ))}
    </ul>
  );
}
