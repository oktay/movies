import { ComponentProps } from "react"

import { cn } from "@/lib/utils"

import { Badge, BadgeProps } from "./ui/badge"

const Root: React.FC<ComponentProps<"div">> = ({ className, ...props }) => {
  return <div className={cn(className)} {...props} />
}

const Backdrop: React.FC<ComponentProps<"div">> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn("container", className)} {...props}>
      <div className="h-hero card-border relative mt-8">{children}</div>
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
      className={cn(
        "container mt-4 md:mt-8 md:px-16 lg:mt-12 lg:px-32",
        className
      )}
      {...props}
    >
      <div className="grid gap-4 md:grid-cols-[auto,1fr] md:gap-10 lg:gap-16">
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
        "card-border relative hidden aspect-poster w-48 place-self-center md:-mt-64 md:block lg:w-80",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

const Content: React.FC<ComponentProps<"div">> = ({ children, ...props }) => {
  return (
    <div
      className="container mt-4 md:mt-8 md:px-16 lg:mt-12 lg:px-32"
      {...props}
    >
      {children}
    </div>
  )
}

const Genres: React.FC<ComponentProps<"div">> = ({ children, ...props }) => {
  return (
    <div className="mt-2 flex flex-wrap gap-2" {...props}>
      {children}
    </div>
  )
}

const Genre: React.FC<BadgeProps> = ({ variant = "secondary", ...props }) => {
  return <Badge variant={variant} {...props} />
}

const Title: React.FC<ComponentProps<"h1">> = ({ children, ...props }) => {
  return <h1 className="mt-4 text-2xl font-medium lg:text-4xl">{children}</h1>
}

const Overview: React.FC<ComponentProps<"p">> = ({ children, ...props }) => {
  return <p className="mt-4 text-muted-foreground lg:text-lg">{children}</p>
}

export const DetailView = {
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
