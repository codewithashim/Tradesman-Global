import { SearchX } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { EmptyState } from "@/components/shared/empty-state";
import { Pagination } from "@/components/shared/pagination";
import { routes } from "@/lib/constants/routes";
import type { Option, SearchParamsRecord } from "@/types/common";
import { CandidateNavigationProvider } from "../hooks/use-candidate-navigation";
import { searchCandidates } from "../services/candidate-service";
import type { CandidateFilters } from "../types/candidate";
import { parseCandidateFilters, serializeCandidateFilters } from "../utils/candidate-filters";
import { ActiveFilterChips } from "./active-filter-chips";
import { CandidateCard } from "./candidate-card";
import { CandidateFiltersPanel } from "./candidate-filters-panel";
import { CandidateResultsRegion } from "./candidate-results-region";
import { CandidateSearchBar } from "./candidate-search-bar";
import { CandidateSortSelect } from "./candidate-sort-select";

interface CandidateDirectoryProps {
  /** Passed through un-awaited so the page shell can prerender; awaited inside Suspense. */
  searchParams: Promise<SearchParamsRecord>;
  tradeOptions: Option[];
  countryOptions: Option[];
}

/** Searchable, filterable, paginated candidate directory. URL is the source of truth. */
export async function CandidateDirectory({ searchParams, tradeOptions, countryOptions }: CandidateDirectoryProps) {
  const filters = parseCandidateFilters(await searchParams);
  const result = await searchCandidates(filters);
  // The service clamps out-of-range pages; keep UI state consistent with it.
  const effectiveFilters: CandidateFilters = { ...filters, page: result.page };
  const options = { tradeOptions, countryOptions };

  const hrefForPage = (page: number) => {
    const query = serializeCandidateFilters({ ...effectiveFilters, page });
    return query ? `${routes.findCandidates}?${query}` : routes.findCandidates;
  };

  const first = (result.page - 1) * result.pageSize + 1;
  const last = first + result.items.length - 1;

  return (
    <CandidateNavigationProvider filters={effectiveFilters}>
      <div className="flex flex-col gap-10">
        <CandidateSearchBar {...options} />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[300px_1fr]">
          <aside aria-label="Filters" className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
            <div className="rounded-3xl bg-card p-6 shadow-soft ring-1 ring-border/70">
              <CandidateFiltersPanel {...options} />
            </div>
          </aside>

          <section aria-labelledby="results-heading" className="flex min-w-0 flex-col gap-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 id="results-heading" aria-live="polite" className="text-muted-foreground">
                <span className="text-2xl font-extrabold tracking-tight text-navy">{result.total}</span>{" "}
                skilled {result.total === 1 ? "worker" : "workers"} found
                {result.total > 0 && (
                  <span className="ml-2 text-sm">
                    · showing {first}–{last}
                  </span>
                )}
              </h2>
              <CandidateSortSelect />
            </div>

            <ActiveFilterChips {...options} />

            <CandidateResultsRegion>
              {result.items.length > 0 ? (
                <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {result.items.map((candidate) => (
                    <li key={candidate.id}>
                      <CandidateCard candidate={candidate} />
                    </li>
                  ))}
                </ul>
              ) : (
                <EmptyState
                  icon={<SearchX aria-hidden className="size-8" />}
                  title="No workers match these filters"
                  description="Try removing a filter, choosing a different country, or searching for a broader skill."
                  action={
                    <div className="flex flex-wrap justify-center gap-2">
                      <ButtonLink href={routes.findCandidates}>Clear all filters</ButtonLink>
                      <ButtonLink href={routes.tradeCategories} variant="secondary">
                        Browse trades
                      </ButtonLink>
                    </div>
                  }
                />
              )}
            </CandidateResultsRegion>

            <div className="pt-4">
              <Pagination page={result.page} pageCount={result.pageCount} hrefForPage={hrefForPage} />
            </div>
          </section>
        </div>
      </div>
    </CandidateNavigationProvider>
  );
}
