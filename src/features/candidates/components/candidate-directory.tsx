import { ArrowRight, SearchX, UserPlus } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { EmptyState } from "@/components/shared/empty-state";
import { Pagination } from "@/components/shared/pagination";
import { routes } from "@/lib/constants/routes";
import type { SearchParamsRecord } from "@/types/common";
import { CandidateNavigationProvider } from "../hooks/use-candidate-navigation";
import { getCandidateCountsByTrade, searchCandidates } from "../services/candidate-service";
import type { CandidateFilters } from "../types/candidate";
import { parseCandidateFilters, serializeCandidateFilters } from "../utils/candidate-filters";
import { ActiveFilterChips } from "./active-filter-chips";
import { CandidateCard } from "./candidate-card";
import { CandidateFiltersPanel, type CandidateFilterOptions } from "./candidate-filters-panel";
import { CandidateResultsRegion } from "./candidate-results-region";
import { CandidateSearchBar } from "./candidate-search-bar";
import { CandidateSortSelect } from "./candidate-sort-select";

interface CandidateDirectoryProps extends CandidateFilterOptions {
  /** Passed through un-awaited so the page shell can prerender; awaited inside Suspense. */
  searchParams: Promise<SearchParamsRecord>;
}

const QUICK_TRADES = 8;
/**
 * The "join" tile sits after this many cards: a row boundary in both the
 * 2-column and 3-column grids, so rows stay even (it spans the row on xl).
 */
const PROMO_AFTER = 6;

/** Searchable, filterable, paginated candidate directory. URL is the source of truth. */
export async function CandidateDirectory({ searchParams, ...options }: CandidateDirectoryProps) {
  const filters = parseCandidateFilters(await searchParams);
  const [result, counts] = await Promise.all([searchCandidates(filters), getCandidateCountsByTrade()]);
  // The service clamps out-of-range pages; keep UI state consistent with it.
  const effectiveFilters: CandidateFilters = { ...filters, page: result.page };
  const query = serializeCandidateFilters(effectiveFilters);

  const quickTrades = options.tradeOptions
    .map((t) => ({ ...t, count: counts[t.value] ?? 0 }))
    .filter((t) => t.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, QUICK_TRADES);

  const hrefForPage = (page: number) => {
    const q = serializeCandidateFilters({ ...effectiveFilters, page });
    return q ? `${routes.findCandidates}?${q}` : routes.findCandidates;
  };

  const first = (result.page - 1) * result.pageSize + 1;
  const last = first + result.items.length - 1;
  const showPromo = result.items.length >= PROMO_AFTER + 2;

  return (
    <CandidateNavigationProvider filters={effectiveFilters}>
      <div className="flex flex-col gap-10 lg:gap-12">
        <CandidateSearchBar {...options} quickTrades={quickTrades} />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[19rem_1fr] xl:gap-10">
          <aside aria-label="Filters" className="hidden lg:sticky lg:top-24 lg:block lg:max-h-[calc(100vh-7rem)] lg:self-start lg:overflow-y-auto lg:[scrollbar-width:thin]">
            <div className="rounded-[1.75rem] bg-card p-6 shadow-soft ring-1 ring-border/70">
              <CandidateFiltersPanel {...options} />
            </div>
          </aside>

          <section aria-labelledby="results-heading" className="flex min-w-0 flex-col gap-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <h2 id="results-heading" aria-live="polite" className="flex items-baseline gap-2.5 text-navy">
                <span className="type-display text-5xl">{result.total}</span>
                <span className="text-base font-medium text-muted-foreground">
                  skilled {result.total === 1 ? "worker" : "workers"}
                  {result.total > 0 && (
                    <span className="hidden sm:inline">
                      {" "}
                      · showing {first}–{last}
                    </span>
                  )}
                </span>
              </h2>
              <CandidateSortSelect />
            </div>

            <ActiveFilterChips {...options} />

            <CandidateResultsRegion resultKey={query}>
              {result.items.length > 0 ? (
                <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {result.items.map((candidate, i) => (
                    <PromoSlot key={candidate.id} show={showPromo && i === PROMO_AFTER}>
                      <li data-card>
                        <CandidateCard candidate={candidate} />
                      </li>
                    </PromoSlot>
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

            <div className="pt-6">
              <Pagination page={result.page} pageCount={result.pageCount} hrefForPage={hrefForPage} />
            </div>
          </section>
        </div>
      </div>
    </CandidateNavigationProvider>
  );
}

/** Renders the "your profile could be here" tile before the card at its slot. */
function PromoSlot({ show, children }: { show: boolean; children: React.ReactNode }) {
  if (!show) return <>{children}</>;
  return (
    <>
      <li
        data-card
        className="relative isolate flex min-h-[26rem] flex-col justify-between gap-6 overflow-hidden rounded-[1.75rem] bg-navy-deep p-7 text-white xl:col-span-3 xl:min-h-0 xl:flex-row xl:items-center xl:p-9"
      >
        <div aria-hidden className="absolute -right-16 -top-16 -z-10 size-64 rounded-full bg-primary/40 blur-3xl" />
        <div aria-hidden className="absolute -bottom-20 -left-10 -z-10 size-56 rounded-full bg-emerald/20 blur-3xl" />
        <span className="grid size-12 place-items-center rounded-2xl bg-white/10 text-brand-blue ring-1 ring-white/15">
          <UserPlus aria-hidden className="size-5" />
        </span>
        <div className="xl:flex-1">
          <p className="type-display text-4xl">Your profile could be here.</p>
          <p className="mt-3 text-sm leading-6 text-white/65">Skilled worker? Show your trade, your work and a video. It’s free.</p>
        </div>
        <ButtonLink href={routes.register} variant="secondary" size="lg" className="w-full bg-white text-navy ring-0 hover:bg-white xl:w-auto">
          Create free profile <ArrowRight />
        </ButtonLink>
      </li>
      {children}
    </>
  );
}
