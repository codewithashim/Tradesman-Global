"use client";

import { useId, type ReactNode } from "react";
import { Loader2, RotateCcw } from "lucide-react";
import { Select } from "@/components/ui/select";
import { cn } from "@/lib/utils/cn";
import type { Option } from "@/types/common";
import { useCandidateNavigation } from "../hooks/use-candidate-navigation";
import { availabilityOptions, experienceOptions } from "../utils/candidate-options";
import { countActiveFilters, defaultCandidateFilters } from "../utils/candidate-filters";

export interface CandidateFilterOptions {
  /** Supplied by the route from the trades / countries features. */
  tradeOptions: Option[];
  countryOptions: Option[];
}

/**
 * Narrowing filters (everything except keyword and sort). Each control
 * applies immediately; used in the desktop sidebar and the mobile drawer.
 */
export function CandidateFiltersPanel({ tradeOptions, countryOptions }: CandidateFilterOptions) {
  const { filters, updateFilters, isPending } = useCandidateNavigation();
  const tradeId = useId();
  const hasFilters = countActiveFilters({ ...filters, query: "" }) > 0;

  return (
    <div className="flex flex-col gap-7">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-base font-bold text-navy">
          Filters
          {isPending && <Loader2 aria-label="Updating results" className="size-4 animate-spin text-primary" />}
        </h2>
        {hasFilters && (
          <button
            type="button"
            onClick={() => updateFilters({ ...defaultCandidateFilters, query: filters.query, sort: filters.sort })}
            className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold text-primary hover:bg-sky"
          >
            <RotateCcw aria-hidden className="size-3" />
            Reset
          </button>
        )}
      </div>

      <FilterGroup label="Trade" htmlFor={tradeId}>
        <Select
          id={tradeId}
          value={filters.trade ?? ""}
          onChange={(event) => updateFilters({ trade: event.target.value || null })}
          className="h-11 rounded-xl"
        >
          <option value="">All trades</option>
          {tradeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </FilterGroup>

      <FilterGroup label="Willing to work in">
        <ChipGroup
          options={countryOptions}
          value={filters.country}
          onChange={(country) => updateFilters({ country })}
        />
      </FilterGroup>

      <FilterGroup label="Experience">
        <ChipGroup
          options={experienceOptions}
          value={filters.experience}
          onChange={(experience) => updateFilters({ experience })}
          columns
        />
      </FilterGroup>

      <FilterGroup label="Availability">
        <ChipGroup
          options={availabilityOptions}
          value={filters.availability}
          onChange={(availability) => updateFilters({ availability })}
        />
      </FilterGroup>

      <label className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl bg-sky/70 px-4 py-3.5">
        <span>
          <span className="block text-sm font-semibold text-navy">Video resume only</span>
          <span className="block text-xs text-muted-foreground">Workers who recorded a video</span>
        </span>
        <span className="relative inline-flex shrink-0">
          <input
            type="checkbox"
            role="switch"
            checked={filters.videoOnly}
            onChange={(event) => updateFilters({ videoOnly: event.target.checked })}
            className="peer absolute inset-0 z-10 cursor-pointer opacity-0"
          />
          <span
            aria-hidden
            className="h-6 w-11 rounded-full bg-border transition peer-checked:bg-primary peer-focus-visible:ring-4 peer-focus-visible:ring-ring/40"
          />
          <span
            aria-hidden
            className="absolute left-0.5 top-0.5 size-5 rounded-full bg-white shadow transition peer-checked:translate-x-5"
          />
        </span>
      </label>
    </div>
  );
}

function FilterGroup({ label, htmlFor, children }: { label: string; htmlFor?: string; children: ReactNode }) {
  const Label = htmlFor ? "label" : "p";
  return (
    <div className="flex flex-col gap-3" role={htmlFor ? undefined : "group"} aria-label={htmlFor ? undefined : label}>
      <Label {...(htmlFor ? { htmlFor } : {})} className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </Label>
      {children}
    </div>
  );
}

interface ChipGroupProps<V extends string> {
  options: Option<V>[];
  value: V | null;
  onChange: (value: V | null) => void;
  /** Two-column grid instead of wrapping row. */
  columns?: boolean;
}

/** Single-select toggle chips; selecting the active chip clears it. */
function ChipGroup<V extends string>({ options, value, onChange, columns }: ChipGroupProps<V>) {
  return (
    <div className={cn(columns ? "grid grid-cols-2 gap-2" : "flex flex-wrap gap-2")}>
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(active ? null : option.value)}
            className={cn(
              "rounded-full px-3.5 py-2 text-sm font-medium transition",
              "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40",
              active
                ? "bg-navy text-white shadow-[0_6px_14px_-6px_rgb(16_42_67/0.6)]"
                : "bg-card text-navy ring-1 ring-border hover:bg-sky hover:ring-primary/30",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
