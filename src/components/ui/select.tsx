import type { ComponentProps } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";

/** Native select (best mobile UX and accessibility) with consistent styling. */
export function Select({ className, children, ...props }: ComponentProps<"select">) {
  return (
    <div className="relative">
      <select
        className={cn(
          "h-11 w-full appearance-none rounded-lg border border-border bg-card pl-3 pr-9 text-base sm:h-10 sm:text-sm",
          "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown aria-hidden className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
    </div>
  );
}
