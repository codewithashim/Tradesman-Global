import type { SearchParamsRecord } from "@/types/common";
import type { CandidateFilters } from "../types/candidate";
import { availabilityOptions, experienceOptions, sortOptions } from "./candidate-options";

/**
 * URL <-> filters. The URL is the single source of truth for directory state,
 * so results are shareable and survive refresh/back navigation.
 */

export const defaultCandidateFilters: CandidateFilters = {
  query: "",
  trade: null,
  country: null,
  experience: null,
  availability: null,
  videoOnly: false,
  sort: "recommended",
  page: 1,
};

const SLUG_PATTERN = /^[a-z0-9-]{1,64}$/;

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function oneOf<V extends string>(value: string | undefined, options: { value: V }[]): V | null {
  return options.find((option) => option.value === value)?.value ?? null;
}

function slug(value: string | undefined): string | null {
  return value && SLUG_PATTERN.test(value) ? value : null;
}

/** Parses untrusted search params; anything invalid falls back to the default. */
export function parseCandidateFilters(params: SearchParamsRecord): CandidateFilters {
  const page = Number.parseInt(first(params.page) ?? "", 10);
  return {
    query: (first(params.q) ?? "").trim().slice(0, 100),
    trade: slug(first(params.trade)),
    country: slug(first(params.country)),
    experience: oneOf(first(params.experience), experienceOptions),
    availability: oneOf(first(params.availability), availabilityOptions),
    videoOnly: first(params.video) === "1",
    sort: oneOf(first(params.sort), sortOptions) ?? defaultCandidateFilters.sort,
    page: Number.isFinite(page) && page > 0 ? page : 1,
  };
}

/** Serializes filters to a query string, omitting defaults for clean URLs. */
export function serializeCandidateFilters(filters: CandidateFilters): string {
  const params = new URLSearchParams();
  if (filters.query) params.set("q", filters.query);
  if (filters.trade) params.set("trade", filters.trade);
  if (filters.country) params.set("country", filters.country);
  if (filters.experience) params.set("experience", filters.experience);
  if (filters.availability) params.set("availability", filters.availability);
  if (filters.videoOnly) params.set("video", "1");
  if (filters.sort !== defaultCandidateFilters.sort) params.set("sort", filters.sort);
  if (filters.page > 1) params.set("page", String(filters.page));
  return params.toString();
}

/** Number of narrowing filters applied (excludes sort and page). */
export function countActiveFilters(filters: CandidateFilters): number {
  return [
    filters.query,
    filters.trade,
    filters.country,
    filters.experience,
    filters.availability,
    filters.videoOnly,
  ].filter(Boolean).length;
}
