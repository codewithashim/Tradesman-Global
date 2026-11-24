import { AE, BD, IT, MY, PT, QA, RO, SA, SG, type FlagComponent } from "country-flag-icons/react/3x2";
import { cn } from "@/lib/utils/cn";

/** Only the flags the platform uses, so the bundle carries nothing extra. */
const flags: Record<string, FlagComponent> = { AE, BD, IT, MY, PT, QA, RO, SA, SG };

interface CountryFlagProps {
  /** ISO 3166-1 alpha-2 code, e.g. "AE". */
  code: string;
  className?: string;
  /** Accessible name; omit when the country name is already next to the flag. */
  title?: string;
}

/** Real flag artwork (3:2) with a hairline edge so white flags stay visible. */
export function CountryFlag({ code, className, title }: CountryFlagProps) {
  const Flag = flags[code.toUpperCase()];
  if (!Flag) return null;
  return (
    <span
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      className={cn("relative inline-block aspect-[3/2] shrink-0 overflow-hidden rounded-[0.3rem] shadow-sm", className)}
    >
      <Flag className="absolute inset-0 size-full" preserveAspectRatio="xMidYMid slice" />
      <span aria-hidden className="absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-black/10" />
    </span>
  );
}
