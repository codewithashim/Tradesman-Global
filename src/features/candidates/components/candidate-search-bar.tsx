"use client";

import { useEffect, useRef, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useCandidateNavigation } from "../hooks/use-candidate-navigation";
import { countActiveFilters } from "../utils/candidate-filters";
import { CandidateFiltersPanel, type CandidateFilterOptions } from "./candidate-filters-panel";

const SEARCH_DEBOUNCE_MS = 400;

/** Large keyword search + (on small screens) the filters drawer trigger. */
export function CandidateSearchBar(options: CandidateFilterOptions) {
  const { filters, updateFilters } = useCandidateNavigation();
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const filterCount = countActiveFilters({ ...filters, query: "" });

  useEffect(() => () => clearTimeout(debounceRef.current), []);

  function onChange(value: string) {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (value.trim() !== filters.query) updateFilters({ query: value.trim() });
    }, SEARCH_DEBOUNCE_MS);
  }

  return (
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
        className="relative flex flex-1 items-center rounded-full bg-card shadow-float ring-1 ring-border/70 focus-within:ring-2 focus-within:ring-primary/50"
      >
        <Search aria-hidden className="pointer-events-none absolute left-5 size-5 text-primary" />
        <input
          // Re-mount when the query changes elsewhere (chips, reset).
          key={filters.query}
          name="q"
          type="search"
          defaultValue={filters.query}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search skills, names, certificates…"
          aria-label="Keyword"
          maxLength={100}
          className="h-14 w-full rounded-full bg-transparent pl-14 pr-4 text-[15px] text-navy outline-none placeholder:text-muted-foreground sm:pr-32"
        />
        <Button type="submit" className="absolute right-2 hidden h-10 sm:inline-flex">
          Search
        </Button>
      </form>

      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetTrigger asChild>
          <Button variant="secondary" className="relative h-14 shrink-0 px-5 lg:hidden" aria-label={`Filters${filterCount ? `, ${filterCount} active` : ""}`}>
            <SlidersHorizontal />
            <span className="max-sm:sr-only">Filters</span>
            {filterCount > 0 && (
              <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-primary text-[11px] font-bold text-white">
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
  );
}
