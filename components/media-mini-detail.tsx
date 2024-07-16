import { ComponentProps } from "react"

import { cn } from "@/lib/utils"

const Root: React.FC<ComponentProps<"div">> = ({ className, ...props }) => {
  return <div className={cn("overflow-hidden", className)} {...props} />
}

const Backdrop: React.FC<ComponentProps<"div">> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn(className)} {...props}>
      <div className="relative h-48 w-full">{children}</div>
    </div>
  )
}

const Hero: React.FC<ComponentProps<"div">> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn("mt-4", className)} {...props}>
      <div className="grid grid-cols-[auto,1fr] gap-4 px-4 pb-4">
        {children}
      </div>
    </div>
  )
}

const Poster: React.FC<ComponentProps<"div">> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "relative -mt-24 aspect-poster w-32 place-self-start",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

const Title: React.FC<ComponentProps<"h1">> = ({ className, ...props }) => {
  return (
    <h1
      className={cn(
        "text-sm font-medium md:text-lg md:leading-tight",
        className
      )}
      {...props}
    />
  )
}

const Overview: React.FC<ComponentProps<"p">> = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        "line-clamp-3 text-xs text-muted-foreground md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export const MediaMiniDetail = {
  Root,
  Backdrop,
  Hero,
  Poster,
  Title,
  Overview,
}
