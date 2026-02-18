# Architecture

This document describes the architectural decisions and patterns used in this Next.js movies application.

## Directory Structure

```
├── app/                    # Next.js App Router
│   ├── (home)/            # Home page route group
│   ├── (lists)/           # List pages (popular, trending, discover)
│   ├── (detail)/          # Detail pages (movie, tv, people)
│   └── actions.ts         # Server actions
├── components/
│   ├── ui/                # shadcn/ui primitives
│   ├── media/             # Shared media components
│   ├── movie/             # Movie-specific components
│   ├── tv/                # TV-specific components
│   ├── person/            # Person-specific components
│   ├── shared/            # Cross-cutting components
│   └── skeletons/         # Loading skeletons
├── tmdb/
│   ├── api/               # API functions & fetcher
│   ├── models/            # TypeScript type definitions
│   └── utils/             # Formatting & image helpers
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
├── config/                # Site configuration
└── styles/                # Global CSS
```

## App Router Patterns

### Route Groups

Route groups `()` organize routes without affecting URL structure:

```
app/
├── (home)/
│   ├── page.tsx           # → /
│   └── loading.tsx
├── (lists)/
│   ├── loading.tsx        # Shared loading for all list pages
│   ├── movie/
│   │   ├── popular/page.tsx    # → /movie/popular
│   │   └── discover/page.tsx   # → /movie/discover
│   └── tv/
│       └── popular/page.tsx    # → /tv/popular
├── (detail)/
│   ├── loading.tsx        # Shared loading for all detail pages
│   ├── movie/[id]/
│   │   ├── layout.tsx     # Fetches movie data, provides context
│   │   ├── page.tsx       # → /movie/[id]
│   │   └── (tabs)/        # Tab navigation via nested route group
│   │       ├── credits/page.tsx
│   │       └── videos/page.tsx
│   └── tv/[id]/
│       └── layout.tsx
```

### Layout Hierarchy

1. **Root Layout** (`app/layout.tsx`): Providers, fonts, global UI
2. **Route Group Layouts**: Shared loading states
3. **Detail Layouts**: Fetch data, render hero/backdrop, provide tabs

### Loading Strategy

- Place `loading.tsx` at route group level for streaming
- Use skeleton components for granular loading states
- Detail pages use layout for data fetching (suspense boundary at page level)

## TMDB API Integration

### API Structure

```
tmdb/
├── api/
│   ├── index.ts           # Exports unified `tmdb` object
│   ├── api.ts             # Base fetcher with error handling
│   ├── config.ts          # Base URL, headers, API key
│   ├── types.ts           # Shared response types
│   ├── movie/
│   │   ├── index.ts       # Movie endpoints
│   │   └── types.ts       # Movie request params
│   ├── tv/
│   ├── person/
│   ├── search/
│   └── trending/
├── models/
│   ├── index.ts           # Barrel export
│   ├── movie.ts           # Movie type
│   ├── tv.ts              # TV type
│   └── commons.ts         # Shared types (Video, Image, etc.)
└── utils/
    ├── format.ts          # Date, runtime, currency formatting
    └── image.ts           # Poster/backdrop URL builder
```

### Usage Pattern

```tsx
// Always import from the centralized object
import { tmdb } from "@/tmdb/api"

// Movie endpoints
const movie = await tmdb.movie.detail({ id, append: "videos,credits" })
const { results } = await tmdb.movie.list({ list: "popular", page })
const credits = await tmdb.movie.credits({ id })

// TV endpoints
const show = await tmdb.tv.detail({ id })

// Search
const results = await tmdb.search.multi({ query, page })

// Trending
const trending = await tmdb.trending.movie({ time: "day", page })
```

### Response Types

```tsx
// Generic list response
type ListResponse<T> = {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

// Detail responses use intersection types for appended data
type MovieWithCredits = MovieDetails & { credits: Credits }
```

## Component Architecture

### Component Categories

| Category  | Location                | Purpose                                        |
| --------- | ----------------------- | ---------------------------------------------- |
| UI        | `components/ui/`        | shadcn/ui primitives (Button, Dialog, etc.)    |
| Media     | `components/media/`     | Shared media components (Poster, Rating, etc.) |
| Movie     | `components/movie/`     | Movie-specific (MovieCard, MovieList)          |
| TV        | `components/tv/`        | TV-specific (TVCard, TVList)                   |
| Person    | `components/person/`    | Person-specific (PersonCard)                   |
| Shared    | `components/shared/`    | Cross-cutting (Pagination, ThemeToggle)        |
| Skeletons | `components/skeletons/` | Loading state components                       |

### Compound Components

Complex UI uses the compound component pattern:

```tsx
// Definition
const Root: React.FC<RootProps> = ({ children, className }) => (
  <div className={cn("relative", className)}>{children}</div>
)

const Content: React.FC<ContentProps> = ({ children }) => (
  <div className="p-4">{children}</div>
)

export const MediaCard = { Root, Content, Title, Excerpt }

// Usage
<MediaCard.Root>
  <MediaPoster image={poster} alt={title} />
  <MediaCard.Content>
    <MediaCard.Title>{title}</MediaCard.Title>
  </MediaCard.Content>
</MediaCard.Root>
```

### Component Composition

Detail pages compose multiple components:

```tsx
<MediaDetailView.Root>
  <MediaDetailView.Backdrop image={backdrop_path} />
  <MediaDetailView.Hero>
    <MediaPoster image={poster_path} alt={title} />
    <MediaDetailView.Info>
      <h1>{title}</h1>
      <MediaRating average={vote_average} />
    </MediaDetailView.Info>
  </MediaDetailView.Hero>
  <MediaDetailView.Content>{children}</MediaDetailView.Content>
</MediaDetailView.Root>
```

## Data Flow

### Server Components (Default)

```
Page Request
    ↓
Layout (fetch data, generate metadata)
    ↓
Page (receive data via props or refetch)
    ↓
Server Components (render with data)
    ↓
HTML Response
```

### Client Interactions

```
User Action (filter, search, paginate)
    ↓
URL Update (searchParams)
    ↓
Server Re-render (new page request)
    ↓
Updated UI
```

### State Management

- **Server State**: Fetched via `tmdb` API in server components
- **URL State**: Filters, pagination, search via `useSearchParams`
- **Client State**: Minimal, only for UI interactions (dialogs, toggles)
- **Cookies**: User preferences (region, theme)

## Configuration

### Site Config (`config/site.ts`)

```tsx
export const siteConfig = {
  name: "Movies",
  description: "...",
  mainNav: [...],
  links: { github: "..." },
}
```

### Pages Config (`config/pages.ts`)

Centralized page metadata for consistency:

```tsx
export const pages = {
  movie: {
    root: { link: "/movie" },
    popular: {
      title: "Popular Movies",
      description: "...",
      link: "/movie/popular",
    },
  },
}
```

## Styling Architecture

### Tailwind + CSS Variables

Theme colors defined as CSS variables in `globals.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
}

.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
}
```

### Custom Utilities

```css
/* Grid for card lists */
.grid-list {
  @apply grid gap-4 grid-cols-[repeat(auto-fill,minmax(8rem,1fr))];
}

/* Gradient overlay for cards */
.overlay {
  @apply absolute inset-0 bg-gradient-to-t from-background/90;
}

/* Empty state placeholder */
.empty-box {
  @apply flex h-32 items-center justify-center rounded-lg border border-dashed;
}
```

## Error Handling

| Scenario       | Solution                            |
| -------------- | ----------------------------------- |
| Missing data   | `notFound()` → `not-found.tsx`      |
| API errors     | Try/catch → `error.tsx`             |
| Adult content  | Check `adult` flag → `notFound()`   |
| Invalid params | Validate → redirect or `notFound()` |

## Performance Considerations

- **Image Optimization**: Next.js Image with TMDB CDN
- **Prefetching**: `prefetch={false}` on list items (many links)
- **Streaming**: `loading.tsx` for instant feedback
- **Caching**: Next.js fetch cache (revalidate as needed)
