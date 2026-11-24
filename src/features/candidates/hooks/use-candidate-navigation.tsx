"use client";

import { createContext, use, useCallback, useMemo, useTransition, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { CandidateFilters } from "../types/candidate";
import { serializeCandidateFilters } from "../utils/candidate-filters";

interface CandidateNavigation {
  filters: CandidateFilters;
  /** Merges changes into the current filters and updates the URL. Resets to page 1 unless `page` is given. */
  updateFilters: (changes: Partial<CandidateFilters>) => void;
  isPending: boolean;
}

const CandidateNavigationContext = createContext<CandidateNavigation | null>(null);

/** Shares one transition between filters, sort and results so the whole directory reflects pending state. */
export function CandidateNavigationProvider({ filters, children }: { filters: CandidateFilters; children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const updateFilters = useCallback(
    (changes: Partial<CandidateFilters>) => {
      const next: CandidateFilters = { ...filters, page: 1, ...changes };
      const query = serializeCandidateFilters(next);
      startTransition(() => {
        router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
      });
    },
    [filters, pathname, router],
  );

  const value = useMemo(() => ({ filters, updateFilters, isPending }), [filters, updateFilters, isPending]);
  return <CandidateNavigationContext value={value}>{children}</CandidateNavigationContext>;
}

export function useCandidateNavigation(): CandidateNavigation {
  const context = use(CandidateNavigationContext);
  if (!context) throw new Error("useCandidateNavigation must be used inside <CandidateNavigationProvider>");
  return context;
}
