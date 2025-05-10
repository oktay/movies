import * as React from "react"

import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

export interface SeparatorLabelProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const SeparatorLabel = React.forwardRef<HTMLDivElement, SeparatorLabelProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className={cn("flex items-center", className)} {...props} ref={ref}>
        <Separator className="w-6" />
        <span className="mx-4 shrink-0 text-sm font-medium text-muted-foreground">
          {children}
        </span>
        <Separator />
      </div>
    )
  }
)
SeparatorLabel.displayName = "SeparatorLabel"

export { SeparatorLabel }
