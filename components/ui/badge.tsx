import * as React from "react"
import { cn } from "./utils"

type VariantProps<T extends (...args: any) => any> = {
  [K in keyof Parameters<T>[0]]?: Parameters<T>[0][K] extends Record<string, any>
    ? keyof Parameters<T>[0][K]
    : never
}

function cva(
  base: string,
  config: {
    variants?: Record<string, Record<string, string>>
    defaultVariants?: Record<string, string>
  }
) {
  return (props: Record<string, any> = {}) => {
    let classes = base
    
    if (config.variants) {
      for (const [variantKey, variantValue] of Object.entries(config.variants)) {
        const selectedVariant = props[variantKey] || config.defaultVariants?.[variantKey]
        if (selectedVariant && variantValue[selectedVariant]) {
          classes += ' ' + variantValue[selectedVariant]
        }
      }
    }
    
    return classes
  }
}

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }