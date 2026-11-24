import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface SectionIntroProps {
  eyebrow?: string;
  /** Rendered in navy… */
  title: string;
  /** …followed by this part in brand blue. */
  highlight?: string;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  action?: ReactNode;
  as?: "h1" | "h2";
  className?: string;
}

/** Eyebrow pill + two-tone heading, the brand's standard section opener. */
export function SectionIntro({
  eyebrow,
  title,
  highlight,
  description,
  align = "left",
  tone = "dark",
  action,
  as: Heading = "h2",
  className,
}: SectionIntroProps) {
  const centered = align === "center";
  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        centered ? "items-center text-center" : "md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className={cn("max-w-2xl", centered && "flex flex-col items-center")}>
        {eyebrow && (
          <span
            className={cn(
              "mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em]",
              tone === "dark" ? "bg-card text-primary shadow-soft ring-1 ring-border" : "bg-white/10 text-brand-blue ring-1 ring-white/15",
            )}
          >
            <span aria-hidden className="size-1.5 rounded-full bg-current" />
            {eyebrow}
          </span>
        )}
        <Heading
          className={cn(
            "font-extrabold tracking-tight text-balance",
            Heading === "h1" ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl",
            tone === "dark" ? "text-navy" : "text-white",
          )}
        >
          {title}
          {highlight && (
            <>
              {" "}
              <span className="text-primary">{highlight}</span>
            </>
          )}
        </Heading>
        {description && (
          <p
            className={cn(
              "mt-4 text-base leading-7 text-pretty sm:text-lg",
              tone === "dark" ? "text-muted-foreground" : "text-white/70",
            )}
          >
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
