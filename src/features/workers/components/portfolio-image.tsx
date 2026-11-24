import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { PortfolioItem } from "../types/worker";

/** Portfolio photo, or a branded placeholder tile until uploads exist. */
/** `compact` hides the label and lifts the icon, leaving room for an overlaid caption. */
export function PortfolioImage({ item, className, compact }: { item: PortfolioItem; className?: string; compact?: boolean }) {
  if (item.imageUrl) {
    // eslint-disable-next-line @next/next/no-img-element -- upload host unknown until Phase 2
    return <img src={item.imageUrl} alt={item.title} className={cn("object-cover", className)} />;
  }
  return (
    <div
      role="img"
      aria-label={`${item.title} (photo not yet uploaded)`}
      className={cn(
        "relative grid place-items-center overflow-hidden bg-linear-to-br from-navy to-navy-deep text-white/70",
        className,
      )}
    >
      <div aria-hidden className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:16px_16px]" />
      <div aria-hidden className="absolute -right-10 -top-10 size-40 rounded-full bg-primary/40 blur-3xl" />
      <span className={cn("relative flex flex-col items-center gap-2", compact && "-translate-y-4")}>
        <span className="grid size-12 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/15 backdrop-blur">
          <ImageIcon aria-hidden className="size-5" strokeWidth={1.75} />
        </span>
        {!compact && <span className="text-xs font-medium text-white/60">Photo coming soon</span>}
      </span>
    </div>
  );
}
