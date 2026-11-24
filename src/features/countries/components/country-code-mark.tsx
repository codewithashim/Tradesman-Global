import { cn } from "@/lib/utils/cn";

/**
 * ISO code tile used in place of flag emoji (which render inconsistently,
 * notably as plain letters on Windows).
 */
export function CountryCodeMark({ isoCode, size = "md" }: { isoCode: string; size?: "md" | "lg" }) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid shrink-0 place-items-center rounded-lg bg-navy font-mono font-bold tracking-wider text-white",
        size === "md" ? "size-10 text-xs" : "size-14 text-sm",
      )}
    >
      {isoCode}
    </span>
  );
}
