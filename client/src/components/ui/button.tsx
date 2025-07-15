import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-body font-semibold hand-drawn chalk-texture transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-theme-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [\u0026_svg]:pointer-events-none [\u0026_svg]:size-4 [\u0026_svg]:shrink-0 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "text-theme-background bg-theme-primary hover:bg-theme-primary/90 active:bg-theme-primary/95 shadow-md hover:shadow-lg active:shadow-sm border-2 border-theme-primary/30 hover:border-theme-primary/40 transform hover:scale-[1.02] active:scale-[0.98]",
        destructive:
          "text-theme-background bg-theme-action hover:bg-theme-action/90 active:bg-theme-action/95 shadow-md hover:shadow-lg active:shadow-sm border-2 border-theme-action/30 hover:border-theme-action/40 transform hover:scale-[1.02] active:scale-[0.98]",
        outline:
          "text-theme-primary border-2 border-theme-primary/40 bg-transparent hover:bg-theme-primary/10 active:bg-theme-primary/15 border-dashed hover:border-theme-primary/60 active:border-theme-primary/70 transform hover:scale-[1.02] active:scale-[0.98]",
        secondary:
          "text-theme-text bg-theme-surface hover:bg-theme-surface/80 active:bg-theme-surface/90 shadow-md hover:shadow-lg active:shadow-sm border-2 border-theme-border hover:border-theme-border/60 transform hover:scale-[1.02] active:scale-[0.98]",
        ghost: "text-theme-text hover:bg-theme-surface/60 active:bg-theme-surface/80 border-2 border-transparent hover:border-theme-surface/30 active:border-theme-surface/40 transform hover:scale-[1.02] active:scale-[0.98]",
        link: "text-theme-primary underline-offset-4 hover:underline active:underline border-none shadow-none transform-none p-0 h-auto font-body font-medium",
        wobbly: "wobbly-border text-theme-primary bg-theme-background hover:bg-theme-surface/50 active:bg-theme-surface/70 border-2 border-theme-primary/30 hover:border-theme-primary/50",
        action: "text-theme-background bg-theme-action hover:bg-theme-action/90 active:bg-theme-action/95 shadow-lg hover:shadow-xl active:shadow-md border-2 border-theme-action/30 hover:border-theme-action/40 transform hover:scale-[1.02] active:scale-[0.98] wind-gust",
        accent: "text-theme-text bg-theme-accent hover:bg-theme-accent/90 active:bg-theme-accent/95 shadow-md hover:shadow-lg active:shadow-sm border-2 border-theme-accent/30 hover:border-theme-accent/40 transform hover:scale-[1.02] active:scale-[0.98]"
      },
      size: {
        default: "h-10 px-5 py-2 text-sm",
        sm: "h-8 px-3 py-1 text-xs",
        lg: "h-12 px-8 py-3 text-base",
        icon: "h-10 w-10 p-0",
        xl: "h-14 px-10 py-4 text-lg",
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
