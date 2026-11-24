import { Building2, MapPin } from "lucide-react";
import { ScrollLine } from "@/components/animations";
import { cn } from "@/lib/utils/cn";
import { formatMonthYear } from "@/lib/formatters/date";
import type { WorkExperience } from "../types/worker";

/** Most recent first; the line draws down as you read. */
export function WorkHistoryTimeline({ entries }: { entries: WorkExperience[] }) {
  return (
    <ol className="relative flex flex-col gap-8">
      <span aria-hidden className="absolute bottom-2 left-[11px] top-2 w-0.5 rounded-full bg-border sm:left-[7.5rem]" />
      <ScrollLine className="bottom-2 left-[11px] top-2 sm:left-[7.5rem]" />
      {entries.map((entry) => {
        const current = entry.endDate === null;
        const startYear = entry.startDate.slice(0, 4);
        return (
          <li key={entry.id} className="relative grid grid-cols-1 gap-2 pl-10 sm:grid-cols-[6.5rem_1fr] sm:gap-10 sm:pl-0">
            <div className="hidden pt-1 text-right sm:block">
              <p className="type-display text-3xl text-navy">{startYear}</p>
              <p className="text-xs text-muted-foreground">{current ? "to now" : `to ${entry.endDate!.slice(0, 4)}`}</p>
            </div>
            <span
              aria-hidden
              className={cn(
                "absolute left-0 top-1.5 grid size-6 place-items-center rounded-full ring-4 ring-card sm:left-[calc(7.5rem-11px)]",
                current ? "bg-primary" : "bg-navy",
              )}
            >
              {current && <span className="absolute inset-0 animate-ping rounded-full bg-primary/40" />}
              <span className="relative size-2 rounded-full bg-white" />
            </span>
            <div className="group">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-semibold text-navy">{entry.role}</h3>
                {current && <span className="rounded-full bg-emerald/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">Current</span>}
              </div>
              <p className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Building2 aria-hidden className="size-3.5" /> {entry.employer}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin aria-hidden className="size-3.5" /> {entry.location}
                </span>
                <span className="sm:hidden">
                  {formatMonthYear(entry.startDate)} – {current ? "Present" : formatMonthYear(entry.endDate!)}
                </span>
              </p>
              <p className="mt-3 rounded-2xl bg-background p-4 text-sm leading-6 text-navy/85 ring-1 ring-border/60 transition duration-300 group-hover:ring-primary/30">
                {entry.description}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
