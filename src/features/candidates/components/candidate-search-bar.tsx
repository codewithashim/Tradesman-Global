"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils/cn";
import { useCandidateNavigation } from "../hooks/use-candidate-navigation";
import { countActiveFilters } from "../utils/candidate-filters";
import { CandidateFiltersPanel, type CandidateFilterOptions } from "./candidate-filters-panel";

const SEARCH_DEBOUNCE_MS = 400;

export interface QuickTrade {
  value: string;
  label: string;
  count: number;
}

interface CandidateSearchBarProps extends CandidateFilterOptions {
  /** Most-listed trades, shown as one-tap filters under the search field. */
  quickTrades: QuickTrade[];
}

/** Large keyword search, one-tap trade chips and (on small screens) the filters drawer. */
export function CandidateSearchBar({ quickTrades, ...options }: CandidateSearchBarProps) {
  const { filters, updateFilters } = useCandidateNavigation();
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const filterCount = countActiveFilters({ ...filters, query: "" });

  useEffect(() => () => clearTimeout(debounceRef.current), []);

  // "/" focuses search, a common shortcut on directory sites.
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const el = event.target as HTMLElement;
      if (event.key !== "/" || el.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName)) return;
      event.preventDefault();
      inputRef.current?.focus();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function onChange(value: string) {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (value.trim() !== filters.query) updateFilters({ query: value.trim() });
    }, SEARCH_DEBOUNCE_MS);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <form
          role="search"
          aria-label="Search candidates"
          onSubmit={(event) => {
            event.preventDefault();
            clearTimeout(debounceRef.current);
            const value = new FormData(event.currentTarget).get("q");
            updateFilters({ query: typeof value === "string" ? value.trim() : "" });
          }}
          className="group relative flex flex-1 items-center rounded-[1.4rem] bg-card p-2 shadow-[0_24px_60px_-20px_rgb(7_29_53/0.35)] ring-1 ring-border/70 transition-shadow duration-300 focus-within:shadow-[0_24px_60px_-16px_rgb(37_99_235/0.4)] focus-within:ring-2 focus-within:ring-primary/40 sm:rounded-[1.75rem]"
        >
          <span aria-hidden className="grid size-11 shrink-0 place-items-center rounded-2xl bg-sky text-primary transition-colors duration-300 group-focus-within:bg-primary group-focus-within:text-white sm:size-12">
            <Search className="size-5" />
          </span>
          <input
            ref={inputRef}
            // Re-mount when the query changes elsewhere (chips, reset).
            key={filters.query}
            name="q"
            type="search"
            defaultValue={filters.query}
            onChange={(event) => onChange(event.target.value)}
            placeholder="Search skills, names, certificates…"
            aria-label="Keyword"
            maxLength={100}
            className="h-12 min-w-0 flex-1 bg-transparent px-3 text-base text-navy outline-none placeholder:text-muted-foreground sm:px-4 sm:text-lg"
          />
          <kbd className="mr-3 hidden rounded-md bg-muted px-2 py-0.5 font-sans text-xs text-muted-foreground ring-1 ring-border lg:block">/</kbd>
          <Button type="submit" size="lg" className="hidden h-12 rounded-2xl px-7 sm:inline-flex">
            Search
          </Button>
        </form>

        <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
          <SheetTrigger asChild>
            <Button
              variant="dark"
              className="relative h-auto w-16 shrink-0 rounded-[1.4rem] px-0 lg:hidden"
              aria-label={`Filters${filterCount ? `, ${filterCount} active` : ""}`}
            >
              <SlidersHorizontal className="size-5" />
              {filterCount > 0 && (
                <span className="absolute right-2 top-2 grid size-5 place-items-center rounded-full bg-primary text-[11px] font-bold text-white ring-2 ring-navy">
                  {filterCount}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="max-h-[88dvh] gap-0 rounded-t-[2rem] border-0 bg-background p-0">
            <SheetTitle className="sr-only">Filters</SheetTitle>
            <SheetDescription className="sr-only">Narrow the candidate list. Changes apply immediately.</SheetDescription>
            <div aria-hidden className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-border" />
            <div className="overflow-y-auto px-6 pb-4 pt-5">
              <CandidateFiltersPanel {...options} />
            </div>
            <div className="border-t border-border bg-card p-4">
              <Button size="lg" className="w-full" onClick={() => setDrawerOpen(false)}>
                Show results
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {quickTrades.length > 0 && (
        <ul aria-label="Popular trades" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0 sm:[mask-image:linear-gradient(to_right,black_92%,transparent)]">
          {quickTrades.map((trade) => {
            const active = filters.trade === trade.value;
            return (
              <li key={trade.value} className="shrink-0">
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => updateFilters({ trade: active ? null : trade.value })}
                  className={cn(
                    "group inline-flex h-10 items-center gap-2 rounded-full pl-3.5 pr-2 text-sm font-semibold transition-all duration-300 active:scale-95",
                    active ? "bg-navy text-white shadow-[0_10px_20px_-10px_rgb(7_29_53/0.7)]" : "bg-card text-navy ring-1 ring-border hover:-translate-y-0.5 hover:shadow-soft hover:ring-primary/30",
                  )}
                >
                  {active && <Check aria-hidden className="size-3.5 animate-in zoom-in" />}
                  {trade.label}
                  <span
                    className={cn(
                      "grid h-6 min-w-6 place-items-center rounded-full px-1.5 text-[11px] font-bold tabular-nums transition-colors",
                      active ? "bg-white/15 text-white" : "bg-sky text-primary group-hover:bg-primary group-hover:text-white",
                    )}
                  >
                    {trade.count}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
