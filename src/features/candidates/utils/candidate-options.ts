import type { Option } from "@/types/common";
import type { CandidateAvailability, CandidateSort, ExperienceBand } from "../types/candidate";

export const experienceOptions: Option<ExperienceBand>[] = [
  { value: "0-2", label: "0–2 years" },
  { value: "3-5", label: "3–5 years" },
  { value: "6-10", label: "6–10 years" },
  { value: "10+", label: "10+ years" },
];

export const experienceRanges: Record<ExperienceBand, { min: number; max: number }> = {
  "0-2": { min: 0, max: 2 },
  "3-5": { min: 3, max: 5 },
  "6-10": { min: 6, max: 10 },
  "10+": { min: 11, max: Number.POSITIVE_INFINITY },
};

export const availabilityOptions: Option<CandidateAvailability>[] = [
  { value: "immediate", label: "Available now" },
  { value: "within-1-month", label: "Within 1 month" },
  { value: "within-3-months", label: "Within 3 months" },
];

export const sortOptions: Option<CandidateSort>[] = [
  { value: "recommended", label: "Recommended" },
  { value: "experience", label: "Most experienced" },
  { value: "recent", label: "Recently updated" },
];

export const availabilityLabels = Object.fromEntries(
  availabilityOptions.map((option) => [option.value, option.label]),
) as Record<CandidateAvailability, string>;

export const CANDIDATES_PAGE_SIZE = 9;

export interface ExperienceLevel {
  label: "Junior" | "Skilled" | "Experienced" | "Senior";
  /** 1–4, for meters. */
  step: 1 | 2 | 3 | 4;
}

/** Plain-language seniority derived from years of experience. */
export function experienceLevel(years: number): ExperienceLevel {
  if (years <= 2) return { label: "Junior", step: 1 };
  if (years <= 5) return { label: "Skilled", step: 2 };
  if (years <= 10) return { label: "Experienced", step: 3 };
  return { label: "Senior", step: 4 };
}
