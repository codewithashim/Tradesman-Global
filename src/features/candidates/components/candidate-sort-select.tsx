"use client";

import { useId } from "react";
import { ArrowUpDown, ChevronDown } from "lucide-react";
import type { CandidateSort } from "../types/candidate";
import { useCandidateNavigation } from "../hooks/use-candidate-navigation";
import { sortOptions } from "../utils/candidate-options";

export function CandidateSortSelect() {
  const { filters, updateFilters } = useCandidateNavigation();
  const id = useId();

  return (
    <div className="group relative inline-flex items-center self-start rounded-full bg-card shadow-soft ring-1 ring-border/70 transition hover:ring-primary/30 focus-within:ring-2 focus-within:ring-primary/50 sm:self-auto">
      <ArrowUpDown aria-hidden className="pointer-events-none absolute left-4 size-4 text-primary transition-transform duration-500 group-hover:rotate-180" />
      <ChevronDown aria-hidden className="pointer-events-none absolute right-4 size-4 text-muted-foreground" />
      <label htmlFor={id} className="sr-only">
        Sort by
      </label>
      <select
        id={id}
        value={filters.sort}
        onChange={(event) => updateFilters({ sort: event.target.value as CandidateSort })}
        className="h-11 cursor-pointer appearance-none rounded-full bg-transparent pl-10 pr-10 text-base font-semibold sm:text-sm text-navy outline-none"
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
