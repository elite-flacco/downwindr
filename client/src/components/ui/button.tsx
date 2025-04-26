import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium hand-drawn chalk-texture chalk-drawn transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative",
  {
    variants: {
      variant: {
        default: "font-bold text-white bg-theme-secondary hover:bg-theme-secondary/90 shadow-md hover:shadow border-2 border-theme-secondary/20",
        destructive:
          "font-bold bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-md hover:shadow border-2 border-destructive/20",
        outline:
          "font-bold text-primary border-2 border-primary/30 bg-background hover:bg-secondary/30 hover:text-accent-foreground border-dashed",
        secondary:
          "font-bold bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-md hover:shadow border-2 border-secondary/20",
        ghost: "font-bold hover:bg-theme-surface hover:text-accent-foreground border-2 border-transparent hover:border-theme-surface/50",
        link: "text-primary underline-offset-4 hover:underline",
        action: "font-bold text-white bg-theme-action hover:bg-theme-action/90 shadow-md hover:shadow border-3 border-theme-action/20"
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
