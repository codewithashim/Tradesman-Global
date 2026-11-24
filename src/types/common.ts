/** Cross-cutting, business-agnostic types shared by every feature. */

/** A page of results plus the info needed to render pagination. */
export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  pageCount: number;
}

/** A value/label pair for selects and filter chips. */
export interface Option<V extends string = string> {
  value: V;
  label: string;
}

/** Raw Next.js `searchParams` object. */
export type SearchParamsRecord = Record<string, string | string[] | undefined>;
