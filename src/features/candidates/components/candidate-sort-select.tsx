"use client";

import { useId } from "react";
import { ArrowUpDown } from "lucide-react";
import type { CandidateSort } from "../types/candidate";
import { useCandidateNavigation } from "../hooks/use-candidate-navigation";
import { sortOptions } from "../utils/candidate-options";

export function CandidateSortSelect() {
  const { filters, updateFilters } = useCandidateNavigation();
  const id = useId();

  return (
    <div className="relative inline-flex items-center rounded-full bg-card shadow-soft ring-1 ring-border/70 focus-within:ring-2 focus-within:ring-primary/50">
      <ArrowUpDown aria-hidden className="pointer-events-none absolute left-4 size-4 text-primary" />
      <label htmlFor={id} className="sr-only">
        Sort by
      </label>
      <select
        id={id}
        value={filters.sort}
        onChange={(event) => updateFilters({ sort: event.target.value as CandidateSort })}
        className="h-11 cursor-pointer appearance-none rounded-full bg-transparent pl-10 pr-5 text-base font-semibold sm:text-sm text-navy outline-none"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
