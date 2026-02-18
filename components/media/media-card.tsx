import { ComponentProps } from "react"

import { cn } from "@/lib/utils"

const Root: React.FC<ComponentProps<"div">> = ({ className, ...props }) => {
  return <div className={cn("relative aspect-poster", className)} {...props} />
}

const Content: React.FC<ComponentProps<"div">> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn("overlay", className)} {...props}>
      <div className="p-2 md:p-6">{children}</div>
    </div>
  )
}

const Title: React.FC<ComponentProps<"h2">> = ({ className, ...props }) => {
  return (
    <h2
      className={cn("line-clamp-1 text-sm font-medium md:text-lg", className)}
      {...props}
    />
  )
}

const Excerpt: React.FC<ComponentProps<"p">> = ({ className, ...props }) => {
  return (
    <p
      className={cn(
        "line-clamp-3 text-xs text-muted-foreground md:text-base",
        className
      )}
      {...props}
    />
  )
}

export const MediaCard = {
  Root,
  Content,
  Title,
  Excerpt,
}
