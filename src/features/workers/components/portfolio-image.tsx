import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { PortfolioItem } from "../types/worker";

/** Portfolio photo, or a branded placeholder tile until uploads exist. */
export function PortfolioImage({ item, className }: { item: PortfolioItem; className?: string }) {
  if (item.imageUrl) {
    // eslint-disable-next-line @next/next/no-img-element -- upload host unknown until Phase 2
    return <img src={item.imageUrl} alt={item.title} className={cn("object-cover", className)} />;
  }
  return (
    <div
      role="img"
      aria-label={`${item.title} (photo not yet uploaded)`}
      className={cn(
        "relative grid place-items-center overflow-hidden bg-gradient-to-br from-sky via-card to-sky text-primary/50",
        className,
      )}
    >
      <div aria-hidden className="absolute inset-0 bg-dot-grid opacity-70" />
      <span className="relative flex flex-col items-center gap-2">
        <span className="grid size-12 place-items-center rounded-2xl bg-card shadow-soft ring-1 ring-border/70">
          <ImageIcon aria-hidden className="size-5" strokeWidth={1.75} />
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Photo coming soon</span>
      </span>
    </div>
  );
}
