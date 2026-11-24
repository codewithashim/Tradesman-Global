"use client";

import { useId, type ReactNode } from "react";
import { Check, Loader2, PlayCircle, RotateCcw } from "lucide-react";
import { Select } from "@/components/ui/select";
import { cn } from "@/lib/utils/cn";
import type { Option } from "@/types/common";
import { useCandidateNavigation } from "../hooks/use-candidate-navigation";
import type { CandidateAvailability } from "../types/candidate";
import { availabilityOptions, experienceOptions } from "../utils/candidate-options";
import { countActiveFilters, defaultCandidateFilters } from "../utils/candidate-filters";

export interface CandidateFilterOptions {
  /** Supplied by the route from the trades / countries features. */
  tradeOptions: Option[];
  countryOptions: Option[];
  /**
   * Server-rendered flag per country slug. Passed in (not imported) so this
   * client component never pulls the countries feature's server code.
   */
  countryFlags?: Record<string, ReactNode>;
}

const availabilityDot: Record<CandidateAvailability, string> = {
  immediate: "bg-emerald",
  "within-1-month": "bg-amber-400",
  "within-3-months": "bg-slate-400",
};

/**
 * Narrowing filters (everything except keyword and sort). Each control
 * applies immediately; used in the desktop sidebar and the mobile drawer.
 */
export function CandidateFiltersPanel({ tradeOptions, countryOptions, countryFlags }: CandidateFilterOptions) {
  const { filters, updateFilters, isPending } = useCandidateNavigation();
  const tradeId = useId();
  const activeCount = countActiveFilters({ ...filters, query: "" });

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between pb-5">
        <h2 className="flex items-center gap-2 text-lg font-bold text-navy">
          Filters
          {activeCount > 0 && (
            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1.5 text-[11px] font-bold text-white animate-in zoom-in">
              {activeCount}
            </span>
          )}
          {isPending && <Loader2 aria-label="Updating results" className="size-4 animate-spin text-primary" />}
        </h2>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={() => updateFilters({ ...defaultCandidateFilters, query: filters.query, sort: filters.sort })}
            className="group flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-primary transition hover:bg-sky"
          >
            <RotateCcw aria-hidden className="size-3 transition-transform duration-500 group-hover:-rotate-180" />
            Reset
          </button>
        )}
      </div>

      <FilterGroup label="Trade" htmlFor={tradeId}>
        <Select
          id={tradeId}
          value={filters.trade ?? ""}
          onChange={(event) => updateFilters({ trade: event.target.value || null })}
          className="h-12 rounded-2xl"
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
        <div className="grid grid-cols-2 gap-2">
          {countryOptions.map((option) => {
            const active = option.value === filters.country;
            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={active}
                onClick={() => updateFilters({ country: active ? null : option.value })}
                className={cn(
                  "group flex min-w-0 items-center gap-2 rounded-xl px-2.5 py-2 text-left text-[13px] font-semibold transition-all duration-300 active:scale-95",
                  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40",
                  active ? "bg-navy text-white shadow-[0_8px_18px_-8px_rgb(7_29_53/0.7)]" : "bg-card text-navy ring-1 ring-border hover:ring-primary/40",
                )}
              >
                {countryFlags?.[option.value] && (
                  <span className="block w-6 shrink-0 transition-transform duration-300 group-hover:scale-110">{countryFlags[option.value]}</span>
                )}
                <span className="truncate">{shortCountry(option.label)}</span>
              </button>
            );
          })}
        </div>
      </FilterGroup>

      <FilterGroup label="Experience">
        <div className="grid grid-cols-2 gap-2">
          {experienceOptions.map((option, i) => {
            const active = option.value === filters.experience;
            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={active}
                onClick={() => updateFilters({ experience: active ? null : option.value })}
                className={cn(
                  "flex flex-col items-start gap-2 rounded-2xl p-3 text-left transition-all duration-300 active:scale-95",
                  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40",
                  active ? "bg-navy text-white shadow-[0_8px_18px_-8px_rgb(7_29_53/0.7)]" : "bg-card text-navy ring-1 ring-border hover:ring-primary/40",
                )}
              >
                <span aria-hidden className="flex gap-0.5">
                  {[0, 1, 2, 3].map((step) => (
                    <span
                      key={step}
                      className={cn("h-2.5 w-1 rounded-full", step <= i ? (active ? "bg-brand-blue" : "bg-primary") : active ? "bg-white/20" : "bg-border")}
                    />
                  ))}
                </span>
                <span className="text-sm font-semibold">{option.label}</span>
              </button>
            );
          })}
        </div>
      </FilterGroup>

      <FilterGroup label="Availability">
        <div className="flex flex-col gap-1.5">
          {availabilityOptions.map((option) => {
            const active = option.value === filters.availability;
            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={active}
                onClick={() => updateFilters({ availability: active ? null : option.value })}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-300",
                  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40",
                  active ? "bg-sky text-navy ring-1 ring-primary/30" : "text-navy/80 hover:bg-sky/60",
                )}
              >
                <span aria-hidden className={cn("size-2.5 rounded-full", availabilityDot[option.value])} />
                <span className="flex-1 text-left">{option.label}</span>
                <span
                  aria-hidden
                  className={cn(
                    "grid size-5 place-items-center rounded-full transition-all duration-300",
                    active ? "scale-100 bg-primary text-white" : "scale-75 ring-1 ring-border",
                  )}
                >
                  {active && <Check className="size-3" strokeWidth={3} />}
                </span>
              </button>
            );
          })}
        </div>
      </FilterGroup>

      <label className="mt-6 flex cursor-pointer items-center gap-3 rounded-2xl bg-linear-to-br from-navy to-navy-deep p-4 text-white">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/10 text-brand-blue">
          <PlayCircle aria-hidden className="size-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-semibold">Video resume only</span>
          <span className="block text-xs text-white/60">See them at work first</span>
        </span>
        <span className="relative inline-flex shrink-0">
          <input
            type="checkbox"
            role="switch"
            checked={filters.videoOnly}
            onChange={(event) => updateFilters({ videoOnly: event.target.checked })}
            className="peer absolute inset-0 z-10 cursor-pointer opacity-0"
          />
          <span aria-hidden className="h-7 w-12 rounded-full bg-white/15 transition-colors duration-300 peer-checked:bg-primary peer-focus-visible:ring-4 peer-focus-visible:ring-ring/40" />
          <span
            aria-hidden
            className="absolute left-1 top-1 size-5 rounded-full bg-white shadow transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] peer-checked:translate-x-5"
          />
        </span>
      </label>
    </div>
  );
}

/** Keeps long names on one line inside the two-column chip grid. */
function shortCountry(label: string) {
  return label === "United Arab Emirates" ? "UAE" : label;
}

function FilterGroup({ label, htmlFor, children }: { label: string; htmlFor?: string; children: ReactNode }) {
  const Label = htmlFor ? "label" : "p";
  return (
    <div className="flex flex-col gap-3 border-t border-border/70 py-5" role={htmlFor ? undefined : "group"} aria-label={htmlFor ? undefined : label}>
      <Label {...(htmlFor ? { htmlFor } : {})} className="text-sm font-semibold text-navy">
        {label}
      </Label>
      {children}
    </div>
  );
}
