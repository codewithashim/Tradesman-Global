"use client";

import { X } from "lucide-react";
import type { Option } from "@/types/common";
import type { CandidateFilters } from "../types/candidate";
import { useCandidateNavigation } from "../hooks/use-candidate-navigation";
import { availabilityLabels, experienceOptions } from "../utils/candidate-options";
import { defaultCandidateFilters } from "../utils/candidate-filters";

interface Chip {
  label: string;
  clear: Partial<CandidateFilters>;
}

/** Removable summary of everything currently narrowing the results. */
export function ActiveFilterChips({ tradeOptions, countryOptions }: { tradeOptions: Option[]; countryOptions: Option[] }) {
  const { filters, updateFilters } = useCandidateNavigation();
  const labelOf = (options: Option[], value: string | null) => options.find((o) => o.value === value)?.label ?? value;

  const chips: Chip[] = [];
  if (filters.query) chips.push({ label: `“${filters.query}”`, clear: { query: "" } });
  if (filters.trade) chips.push({ label: labelOf(tradeOptions, filters.trade) ?? filters.trade, clear: { trade: null } });
  if (filters.country) chips.push({ label: `Open to ${labelOf(countryOptions, filters.country)}`, clear: { country: null } });
  if (filters.experience) {
    chips.push({ label: labelOf(experienceOptions, filters.experience) ?? filters.experience, clear: { experience: null } });
  }
  if (filters.availability) chips.push({ label: availabilityLabels[filters.availability], clear: { availability: null } });
  if (filters.videoOnly) chips.push({ label: "Video resume", clear: { videoOnly: false } });

  if (chips.length === 0) return null;

  return (
    <ul aria-label="Active filters" className="flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <li key={chip.label} className="animate-in fade-in zoom-in-90 duration-300">
          <button
            type="button"
            onClick={() => updateFilters(chip.clear)}
            aria-label={`Remove filter: ${chip.label}`}
            className="group inline-flex items-center gap-1.5 rounded-full bg-sky py-1.5 pl-3.5 pr-1.5 text-sm font-semibold text-navy ring-1 ring-primary/20 transition-all duration-300 hover:bg-navy hover:text-white"
          >
            {chip.label}
            <span className="grid size-5 place-items-center rounded-full bg-primary/10 text-primary transition-all duration-300 group-hover:rotate-90 group-hover:bg-white/20 group-hover:text-white">
              <X aria-hidden className="size-3" />
            </span>
          </button>
        </li>
      ))}
      {chips.length > 1 && (
        <li>
          <button
            type="button"
            onClick={() => updateFilters({ ...defaultCandidateFilters, sort: filters.sort })}
            className="rounded-full px-3 py-1.5 text-sm font-semibold text-primary hover:bg-sky"
          >
            Clear all
          </button>
        </li>
      )}
    </ul>
  );
}
