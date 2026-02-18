# Copilot Instructions

## Project Overview

This is a Next.js 14 movies application using:

- **Framework:** Next.js App Router (server components by default)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS with CSS variables
- **UI Components:** shadcn/ui (Radix + Tailwind)
- **API:** TMDB API via centralized `tmdb` object

## Code Style

- No semicolons
- Double quotes for strings
- 2-space indentation
- Trailing commas (ES5)
- Import alias: `@/` for root

### Import Order

```tsx
import { ... } from "react"
import { ... } from "next/..."

import { ... } from "third-party"

import { ... } from "@/config/..."
import { ... } from "@/lib/..."
import { ... } from "@/hooks/..."
import { ... } from "@/components/ui/..."
import { ... } from "@/components/..."

import { ... } from "./local"
```

## Component Patterns

### File & Naming

- Filename: `kebab-case.tsx`
- Component: `PascalCase`
- Always use **named exports**, not default

### Props Typing

```tsx
interface MediaPosterProps extends ComponentProps<"div"> {
  image?: string
  alt: string
  priority?: boolean
}

export const MediaPoster: React.FC<MediaPosterProps> = ({
  image,
  alt,
  className,
  ...props
}) => { ... }
```

### Compound Components

```tsx
const Root: React.FC<...> = ({ children, className }) => (
  <div className={cn("base-styles", className)}>{children}</div>
)

const Title: React.FC<...> = ({ children }) => (
  <h3 className="font-medium">{children}</h3>
)

export const MediaCard = { Root, Title, Content, Excerpt }
// Usage: <MediaCard.Root><MediaCard.Title>...</MediaCard.Title></MediaCard.Root>
```

## Styling

- Use `cn()` utility from `@/lib/utils` for class merging
- Prefer semantic tokens: `bg-background`, `text-foreground`, `text-muted-foreground`
- Custom utilities available: `grid-list`, `overlay`, `empty-box`

```tsx
<div className={cn("flex items-center gap-2", className)}>
```

## Data Fetching

### Server Components (default)

```tsx
export default async function Page() {
  const { results } = await tmdb.movie.list({ list: "popular", page: "1" })

  if (!results) return notFound()

  return <MovieList movies={results} />
}
```

### API Usage

```tsx
// Use centralized tmdb object
import { tmdb } from "@/tmdb/api"

const movie = await tmdb.movie.detail({ id, append: "videos,credits" })
const shows = await tmdb.tv.list({ list: "popular" })
const results = await tmdb.search.multi({ query, page })
```

### Server Actions

```tsx
"use server"

import { cookies } from "next/headers"

export async function setRegion(region: string) {
  cookies().set("region", region, { maxAge: 60 * 60 * 24 * 365 })
}
```

## App Router Structure

- Use route groups `()` for organization without URL impact
- Place `loading.tsx` at route group level for streaming
- Generate metadata in layouts/pages with `generateMetadata`

```
app/
├── (home)/page.tsx
├── (lists)/movie/popular/page.tsx
├── (detail)/movie/[id]/layout.tsx
```

## Type Definitions

- Use `type` keyword for data shapes
- Types live in `tmdb/models/`
- Use intersection types for composition

```tsx
export type Movie = {
  id: number
  title: string
  poster_path: string
  vote_average: number
}

export type MovieWithMediaType = WithMediaType<Movie, "movie">
```

## UI Components (shadcn/ui)

- Located in `components/ui/`
- Use CVA for variants
- Always forward refs

```tsx
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
```

## Icons

Use Lucide React icons:

```tsx
import { ChevronRight, Play, Star } from "lucide-react"
```

## Custom Hooks

- Located in `hooks/`
- Mark client components with `"use client"`
- Use URL state via `useSearchParams` when appropriate

## Error Handling

- Use `notFound()` from `next/navigation` for missing data
- Use `error.tsx` for error boundaries (must be client component)
