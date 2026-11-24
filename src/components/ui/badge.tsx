import type { ComponentProps } from "react";
import { cn } from "@/lib/utils/cn";

type BadgeVariant = "neutral" | "brand" | "success" | "outline";

const variants: Record<BadgeVariant, string> = {
  neutral: "bg-muted text-foreground",
  brand: "bg-sky text-primary ring-1 ring-inset ring-primary/20",
  success: "bg-emerald/10 text-emerald-700 ring-1 ring-inset ring-emerald/25",
  outline: "text-muted-foreground ring-1 ring-inset ring-border",
};

interface BadgeProps extends ComponentProps<"span"> {
  variant?: BadgeVariant;
}

export function Badge({ variant = "neutral", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
