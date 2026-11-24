import { cn } from "@/lib/utils/cn";
import { experienceLevel } from "../utils/candidate-options";

/** "12 yrs · Senior" with a four-step meter. */
export function ExperienceMeter({ years, className }: { years: number; className?: string }) {
  const level = experienceLevel(years);
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <span aria-hidden className="flex gap-0.5">
        {[1, 2, 3, 4].map((step) => (
          <span
            key={step}
            className={cn("h-3.5 w-1.5 rounded-full", step <= level.step ? "bg-primary" : "bg-border")}
          />
        ))}
      </span>
      <span className="text-sm text-navy">
        <strong className="font-bold">{years}</strong> {years === 1 ? "yr" : "yrs"}
        <span className="text-muted-foreground"> · {level.label}</span>
      </span>
    </div>
  );
}
