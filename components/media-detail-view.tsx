import { ComponentProps } from "react"

import { cn } from "@/lib/utils"
import { Badge, BadgeProps } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

const Root: React.FC<ComponentProps<"div">> = ({ className, ...props }) => {
  return <div className={cn("overflow-hidden", className)} {...props} />
}

const Backdrop: React.FC<ComponentProps<"div">> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn("container", className)} {...props}>
      <div className="md:h-hero relative hidden aspect-poster w-full md:block">
        {children}
      </div>
    </div>
  )
}

const Hero: React.FC<ComponentProps<"div">> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn("container md:mt-8 md:px-16 xl:mt-12 xl:px-32", className)}
      {...props}
    >
      <div className="grid gap-4 md:grid-cols-[auto,1fr] md:gap-10 xl:gap-16">
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
        "relative aspect-poster w-full place-self-start md:-mt-32 md:block md:w-56 lg:w-64 xl:-mt-64 xl:w-80",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

const Content: React.FC<ComponentProps<"div">> = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        "container mt-4 md:mt-8 md:px-16 xl:mt-12 xl:px-32",
        className
      )}
      {...props}
    />
  )
}

const Genres: React.FC<ComponentProps<"div">> = ({ className, ...props }) => {
  return <div className={cn("flex flex-wrap gap-2", className)} {...props} />
}

const Genre: React.FC<BadgeProps> = ({ variant = "secondary", ...props }) => {
  return <Badge variant={variant} {...props} />
}

const Title: React.FC<ComponentProps<"h1">> = ({ className, ...props }) => {
  return (
    <h1
      className={cn("text-2xl font-medium xl:text-4xl", className)}
      {...props}
    />
  )
}

const Overview: React.FC<ComponentProps<"p">> = ({ className, ...props }) => {
  return (
    <div
      className={cn("space-y-4 text-muted-foreground xl:text-lg", className)}
      {...props}
    />
  )
}

export const SkeletonMediaDetail = () => (
  <MediaDetailView.Root>
    <MediaDetailView.Backdrop>
      <Skeleton className="size-full rounded-md" />
    </MediaDetailView.Backdrop>

    <MediaDetailView.Hero>
      <MediaDetailView.Poster>
        <Skeleton className="size-full rounded-md" />
      </MediaDetailView.Poster>

      <div className="space-y-4">
        <Skeleton className="h-6 w-40 rounded-md" />
        <Skeleton className="h-4 w-60 rounded-md" />
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-4 w-full rounded-md" />
      </div>
    </MediaDetailView.Hero>

    <MediaDetailView.Content>
      <Skeleton className="mt-4 h-[30vh] w-full rounded-md" />
    </MediaDetailView.Content>
  </MediaDetailView.Root>
)

export const MediaDetailView = {
  Root,
  Backdrop,
  Hero,
  Content,
  Poster,
  Genres,
  Genre,
  Title,
  Overview,
}
