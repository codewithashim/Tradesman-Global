import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils/cn"
import { Slot } from "radix-ui"

/*
 * Pill buttons with tactile motion:
 * - a light sweep crosses the button on hover (the ::before layer, behind the label),
 * - a trailing icon slides forward, a leading icon tilts,
 * - the button lifts on hover and presses in on tap.
 * The sweep colour is --shine so light and dark variants each get a visible one.
 */
const buttonVariants = cva(
  [
    "group/btn relative isolate inline-flex shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full text-sm font-semibold whitespace-nowrap outline-none select-none",
    "transition-[transform,box-shadow,background-color,color,filter] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.97] active:duration-100",
    "focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20",
    "before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:-z-10 before:w-[60%] before:-translate-x-[180%] before:-skew-x-[20deg] before:bg-linear-to-r before:from-transparent before:via-(--shine) before:to-transparent before:transition-transform before:duration-700 before:ease-out hover:before:translate-x-[260%] [--shine:rgb(255_255_255/0.35)]",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg]:transition-transform [&_svg]:duration-300",
    "hover:[&>svg:last-child:not(:first-child)]:translate-x-1 hover:[&>svg:first-child:not(:last-child)]:-rotate-12",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-linear-to-b from-brand-blue to-primary text-primary-foreground shadow-[0_10px_24px_-8px_rgb(37_99_235/0.6)] hover:-translate-y-0.5 hover:shadow-[0_18px_32px_-10px_rgb(37_99_235/0.7)] hover:brightness-110",
        dark: "bg-navy text-white shadow-[0_10px_24px_-10px_rgb(7_29_53/0.6)] hover:-translate-y-0.5 hover:bg-navy-deep hover:shadow-[0_18px_32px_-12px_rgb(7_29_53/0.7)]",
        secondary:
          "bg-card text-foreground shadow-soft ring-1 ring-border [--shine:rgb(37_99_235/0.14)] hover:-translate-y-0.5 hover:shadow-float hover:ring-primary/30",
        outline: "border border-border bg-card text-foreground [--shine:rgb(37_99_235/0.12)] hover:border-primary/40 hover:bg-sky",
        ghost: "[--shine:rgb(255_255_255/0.18)] hover:bg-sky",
        link: "text-primary underline-offset-4 before:hidden hover:underline",
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
