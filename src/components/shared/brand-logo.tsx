import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { routes } from "@/lib/constants/routes";

/**
 * Wordmark + monogram. The mark is a globe meridian crossed by a level line —
 * "global" + "trade" — drawn inline so it stays crisp and themeable.
 */
export function BrandLogo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <Link
      href={routes.home}
      aria-label="Tradesman Global home"
      className={cn("group flex items-center gap-2.5", className)}
    >
      <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-brand-blue to-primary shadow-[0_6px_16px_-6px_rgb(37_99_235/0.7)]">
        <svg viewBox="0 0 24 24" className="size-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 3.5c2.6 2.4 3.8 5.2 3.8 8.5s-1.2 6.1-3.8 8.5c-2.6-2.4-3.8-5.2-3.8-8.5S9.4 5.9 12 3.5Z" />
          <path d="M4 12h16" strokeWidth="2.4" />
        </svg>
      </span>
      <span className={cn("leading-none", tone === "light" ? "text-white" : "text-navy")}>
        <span className="block text-[15px] font-extrabold tracking-tight">Tradesman</span>
        <span
          className={cn(
            "block text-[10px] font-semibold uppercase tracking-[0.28em]",
            tone === "light" ? "text-brand-blue" : "text-primary",
          )}
        >
          Global
        </span>
      </span>
    </Link>
  );
}
