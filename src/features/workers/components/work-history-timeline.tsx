import { Building2, MapPin } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { formatMonthYear } from "@/lib/formatters/date";
import type { WorkExperience } from "../types/worker";

export function WorkHistoryTimeline({ entries }: { entries: WorkExperience[] }) {
  return (
    <ol className="relative flex flex-col gap-5">
      <span aria-hidden className="absolute bottom-4 left-[11px] top-4 w-px bg-gradient-to-b from-primary/50 via-border to-transparent" />
      {entries.map((entry) => {
        const current = entry.endDate === null;
        return (
          <li key={entry.id} className="relative pl-10">
            <span
              aria-hidden
              className={cn(
                "absolute left-0 top-5 grid size-6 place-items-center rounded-full ring-4 ring-card",
                current ? "bg-primary" : "bg-border",
              )}
            >
              <span className="size-2 rounded-full bg-white" />
            </span>
            <div className="rounded-2xl bg-background p-5 ring-1 ring-border/70">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-base font-bold text-navy">{entry.role}</h3>
                <span
                  className={cn(
                    "rounded-full px-2.5 py-1 text-xs font-semibold",
                    current ? "bg-emerald/10 text-emerald-700" : "bg-muted text-muted-foreground",
                  )}
                >
                  {formatMonthYear(entry.startDate)} – {current ? "Present" : formatMonthYear(entry.endDate!)}
                </span>
              </div>
              <p className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Building2 aria-hidden className="size-3.5" /> {entry.employer}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin aria-hidden className="size-3.5" /> {entry.location}
                </span>
              </p>
              <p className="mt-3 text-sm leading-6 text-navy/85">{entry.description}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
