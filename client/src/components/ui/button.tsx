import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium hand-drawn hand-drawn-texture transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative after:content-[''] after:absolute after:inset-0 after:opacity-10 after:bg-[radial-gradient(circle_at_top_right,white,transparent_70%)]",
  {
    variants: {
      variant: {
        default: "font-semibold text-white bg-theme-secondary hover:bg-theme-secondary/90 shadow-md hover:shadow",
        destructive:
          "font-semibold bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-md hover:shadow",
        outline:
          "font-semibold text-primary border-2 border-input bg-background hover:bg-secondary hover:text-accent-foreground border-dashed",
        secondary:
          "font-semibold bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-md hover:shadow",
        ghost: "font-semibold hover:bg-theme-surface hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        action: "font-bold text-white bg-theme-action hover:bg-theme-action/90 shadow-md hover:shadow"
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 px-3 py-1 text-xs",
        lg: "h-12 px-8 py-3",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
