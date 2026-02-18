# Code Conventions

This document describes the coding conventions and patterns used throughout this project.

## File Naming

| Type       | Convention       | Example                              |
| ---------- | ---------------- | ------------------------------------ |
| Components | `kebab-case.tsx` | `media-poster.tsx`                   |
| Pages      | `page.tsx`       | `app/(lists)/movie/popular/page.tsx` |
| Layouts    | `layout.tsx`     | `app/(detail)/movie/[id]/layout.tsx` |
| Loading    | `loading.tsx`    | `app/(lists)/loading.tsx`            |
| Hooks      | `camelCase.ts`   | `useFilters.ts`                      |
| Utils      | `kebab-case.ts`  | `lib/utils.ts`                       |
| Types      | `kebab-case.ts`  | `tmdb/models/movie.ts`               |
| Config     | `kebab-case.ts`  | `config/site.ts`                     |

## Naming Conventions

### Components

```tsx
// Filename: media-poster.tsx
// Component: PascalCase
export const MediaPoster: React.FC<MediaPosterProps> = () => { ... }

// Compound components
export const MediaCard = { Root, Content, Title, Excerpt }
```

### Functions & Variables

```tsx
// Functions: camelCase
function formatRuntime(minutes: number) { ... }

// Constants: camelCase or UPPER_SNAKE_CASE for true constants
const siteConfig = { ... }
const API_BASE_URL = "https://api.themoviedb.org/3"

// Boolean variables: is/has/should prefix
const isLoading = true
const hasCredits = credits.length > 0
```

### Types

```tsx
// Types: PascalCase
type Movie = { ... }
type MovieListType = "popular" | "top_rated" | "upcoming"

// Props interfaces: ComponentNameProps
interface MediaPosterProps { ... }

// Request params: DescriptiveRequestParams
type MovieListRequestParams = { ... }
```

## Export Patterns

### Named Exports (Required)

```tsx
// ✅ Correct: Named export
export const MovieCard: React.FC<Movie> = () => { ... }

// ❌ Wrong: Default export
export default function MovieCard() { ... }
```

### Barrel Exports

Re-export from index files for cleaner imports:

```tsx
// Usage
import { useFilters, usePagination } from "@/hooks"

// hooks/index.ts
export * from "./useFilters"
export * from "./usePagination"
export * from "./useSearch"
```

## Component Patterns

### Basic Component

```tsx
import { ComponentProps } from "react"

import { cn } from "@/lib/utils"

interface MediaPosterProps extends ComponentProps<"div"> {
  image?: string
  alt: string
  priority?: boolean
}

export const MediaPoster: React.FC<MediaPosterProps> = ({
  image,
  alt,
  priority,
  className,
  ...props
}) => {
  return (
    <div className={cn("relative aspect-poster", className)} {...props}>
      <Image
        src={image}
        alt={alt}
        priority={priority}
        fill
        className="object-cover"
      />
    </div>
  )
}
```

### Compound Component

```tsx
import { ComponentProps } from "react"

import { cn } from "@/lib/utils"

interface RootProps extends ComponentProps<"div"> {
  children: React.ReactNode
}

const Root: React.FC<RootProps> = ({ children, className, ...props }) => (
  <div
    className={cn("group relative overflow-hidden rounded-md", className)}
    {...props}
  >
    {children}
  </div>
)

interface TitleProps {
  children: React.ReactNode
}

const Title: React.FC<TitleProps> = ({ children }) => (
  <h3 className="truncate font-medium">{children}</h3>
)

const Content: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="space-y-1 p-2">{children}</div>
)

const Excerpt: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="truncate text-xs text-muted-foreground">{children}</p>
)

export const MediaCard = { Root, Title, Content, Excerpt }
```

### Client Component

```tsx
"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"

export const SearchInput: React.FC = () => {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get("q") ?? "")

  return <input value={query} onChange={(e) => setQuery(e.target.value)} />
}
```

## Props Patterns

### Extending HTML Elements

```tsx
// Extend native element props
interface ButtonProps extends ComponentProps<"button"> {
  variant?: "default" | "outline"
}

// For Radix components
interface DialogProps extends ComponentProps<typeof DialogPrimitive.Root> {
  title: string
}
```

### Using Domain Types

```tsx
// When component maps 1:1 with API data
import { Movie } from "@/tmdb/models"

export const MovieCard: React.FC<Movie> = ({
  id,
  title,
  poster_path,
  vote_average,
}) => { ... }
```

### Optional Props with Defaults

```tsx
interface MediaPosterProps {
  image?: string
  size?: "w300" | "w500" | "original"
  alt: string
}

export const MediaPoster: React.FC<MediaPosterProps> = ({
  image,
  size = "w500",  // Default value
  alt,
}) => { ... }
```

## Styling Patterns

### Class Merging

Always use `cn()` for conditional and merged classes:

```tsx
import { cn } from "@/lib/utils"

// Merge with className prop
<div className={cn("flex items-center gap-2", className)}>

// Conditional classes
<div className={cn(
  "rounded-md border",
  isActive && "border-primary",
  isDisabled && "opacity-50 pointer-events-none"
)}>
```

### Semantic Tokens

Prefer semantic color tokens over hardcoded values:

```tsx
// ✅ Correct: Semantic tokens
<div className="bg-background text-foreground">
<p className="text-muted-foreground">
<div className="border-border">
<button className="bg-primary text-primary-foreground">

// ❌ Wrong: Hardcoded colors
<div className="bg-white text-black dark:bg-gray-900">
```

### Responsive Design

```tsx
// Mobile-first approach
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

// Custom grid utility for card lists
<div className="grid-list">
```

### Common Patterns

```tsx
// Aspect ratios
<div className="aspect-video">      // 16:9
<div className="aspect-poster">     // 2:3 (custom)

// Truncation
<p className="truncate">            // Single line
<p className="line-clamp-2">        // Multi-line

// Hover states with group
<div className="group">
  <div className="opacity-0 group-hover:opacity-100">
</div>
```

## Type Definition Patterns

### Domain Types

```tsx
// Use `type` for data shapes
export type Movie = {
  id: number
  title: string
  poster_path: string | null
  backdrop_path: string | null
  overview: string
  release_date: string
  vote_average: number
  vote_count: number
}

// Union types for enums
export type MovieListType = "popular" | "top_rated" | "upcoming" | "now_playing"
```

### Composition with Intersection

```tsx
// Add media_type discriminator
export type WithMediaType<T, M> = T & { media_type: M }

export type MovieWithMediaType = WithMediaType<Movie, "movie">
export type TVWithMediaType = WithMediaType<TV, "tv">

// Combine with appended data
export type MovieWithCredits = MovieDetails & {
  credits: Credits
}
```

### API Response Types

```tsx
// Generic list response
export type ListResponse<T> = {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

// Request parameter types
export type MovieListRequestParams = {
  list: MovieListType
  page?: string
  region?: string
}
```

## Data Fetching Patterns

### Page Component

```tsx
import { notFound } from "next/navigation"
import { tmdb } from "@/tmdb/api"

import { MovieList } from "@/components/movie/movie-list"

interface PageProps {
  searchParams: { page?: string }
}

export default async function PopularMovies({ searchParams }: PageProps) {
  const { results, total_pages } = await tmdb.movie.list({
    list: "popular",
    page: searchParams.page ?? "1",
  })

  if (!results?.length) return notFound()

  return <MovieList movies={results} totalPages={total_pages} />
}
```

### Layout with Data

```tsx
import { notFound } from "next/navigation"
import { tmdb } from "@/tmdb/api"

interface LayoutProps {
  params: { id: string }
  children: React.ReactNode
}

export default async function MovieLayout({ params, children }: LayoutProps) {
  const movie = await tmdb.movie.detail({
    id: params.id,
    append: "videos,credits",
  })

  if (!movie.id || movie.adult) return notFound()

  return (
    <div>
      <MovieHero movie={movie} />
      {children}
    </div>
  )
}
```

### Metadata Generation

```tsx
import { Metadata } from "next"
import { tmdb } from "@/tmdb/api"

import { siteConfig } from "@/config/site"

interface PageProps {
  params: { id: string }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const movie = await tmdb.movie.detail({ id: params.id })

  return {
    title: movie.title,
    description: movie.overview,
    openGraph: {
      images: [`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`],
    },
  }
}
```

## Server Action Patterns

```tsx
// app/actions.ts
"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

export async function setRegion(region: string) {
  cookies().set("region", region, {
    maxAge: 60 * 60 * 24 * 365,
  })
  revalidatePath("/")
}

export async function setTheme(theme: "light" | "dark" | "system") {
  cookies().set("theme", theme)
}
```

## Hook Patterns

### URL State Hook

```tsx
"use client"

import { useCallback } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export const useFilters = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const setFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      router.push(`${pathname}?${params.toString()}`)
    },
    [pathname, router, searchParams]
  )

  return { searchParams, setFilter }
}
```

### Dialog State Hook

```tsx
"use client"

import { useCallback, useState } from "react"

export const useDialog = (defaultOpen = false) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  const toggle = useCallback(() => setIsOpen((prev) => !prev), [])

  return { isOpen, open, close, toggle, setIsOpen }
}
```

## Import Organization

Imports should be organized in this order (handled by Prettier plugin):

```tsx
// 1. React
import { useEffect, useState } from "react"
// 2. Next.js
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
// 6. Internal: hooks
import { useFilters } from "@/hooks"
// 3. Third-party libraries
import { ChevronRight, Star } from "lucide-react"

// 4. Internal: config
import { siteConfig } from "@/config/site"
// 5. Internal: lib/utils
import { cn } from "@/lib/utils"
// 7. Internal: UI components
import { Button } from "@/components/ui/button"
// 8. Internal: feature components
import { MovieCard } from "@/components/movie/movie-card"

// 9. Local/relative imports
import { formatRuntime } from "./utils"
```

## Error Handling

### In Server Components

```tsx
export default async function MoviePage({ params }: PageProps) {
  const movie = await tmdb.movie.detail({ id: params.id })

  // Missing data
  if (!movie.id) return notFound()

  // Adult content filter
  if (movie.adult) return notFound()

  return <MovieDetail movie={movie} />
}
```

### Error Boundary

```tsx
// app/error.tsx
"use client"

import { useEffect } from "react"

import { Button } from "@/components/ui/button"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center gap-4">
      <h2>Something went wrong!</h2>
      <Button onClick={reset}>Try again</Button>
    </div>
  )
}
```

## Testing Conventions

### File Naming

```
component.tsx
component.test.tsx
```

### Test Structure

```tsx
import { render, screen } from "@testing-library/react"

import { MovieCard } from "./movie-card"

describe("MovieCard", () => {
  it("renders movie title", () => {
    render(<MovieCard title="Inception" {...mockMovie} />)
    expect(screen.getByText("Inception")).toBeInTheDocument()
  })
})
```
