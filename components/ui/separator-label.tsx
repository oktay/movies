import * as React from "react"

export interface SeparatorLabelProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const SeparatorLabel = React.forwardRef<HTMLDivElement, SeparatorLabelProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <span className="block  shrink-0 text-xs font-bold uppercase tracking-widest text-muted-foreground">
        {children}
      </span>
    )
  }
)
SeparatorLabel.displayName = "SeparatorLabel"

export { SeparatorLabel }
