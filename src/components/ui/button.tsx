import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils/cn"
import { Slot } from "radix-ui"

// Brand note: pill-shaped buttons with soft depth (see design direction).
const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-b from-brand-blue to-primary text-primary-foreground shadow-[0_10px_24px_-8px_rgb(37_99_235/0.6)] hover:-translate-y-px hover:brightness-105",
        dark: "bg-navy text-white shadow-[0_10px_24px_-10px_rgb(7_29_53/0.6)] hover:-translate-y-px hover:bg-navy-deep",
        secondary: "bg-card text-foreground shadow-soft ring-1 ring-border hover:-translate-y-px hover:bg-sky",
        outline: "border border-border bg-card text-foreground hover:bg-sky",
        ghost: "hover:bg-sky",
        link: "text-primary underline-offset-4 hover:underline",
        destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20",
      },
      size: {
        default: "h-10 px-5 has-[>svg]:px-4",
        sm: "h-9 px-4 has-[>svg]:px-3",
        lg: "h-12 px-6 text-[15px] has-[>svg]:px-5",
        icon: "size-10",
        "icon-sm": "size-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
