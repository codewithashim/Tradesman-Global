/*
 * Date formatting with a fixed locale and UTC so server and client output
 * always match (no hydration mismatches, no dependence on server locale).
 */

const LOCALE = "en-GB";

const monthYear = new Intl.DateTimeFormat(LOCALE, { month: "short", year: "numeric", timeZone: "UTC" });
const fullDate = new Intl.DateTimeFormat(LOCALE, { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

/** "2024-03" or ISO string → "Mar 2024". */
export function formatMonthYear(value: string): string {
  return monthYear.format(new Date(value.length === 7 ? `${value}-01T00:00:00Z` : value));
}

/** ISO string → "20 Nov 2026". */
export function formatDate(value: string): string {
  return fullDate.format(new Date(value));
}

/** Seconds → "1:05". */
export function formatDuration(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}
