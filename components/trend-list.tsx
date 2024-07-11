import { notFound } from "next/navigation"
import { tmdb } from "@/tmdb/api"

import { Skeleton } from "@/components/ui/skeleton"
import { ListPagination } from "@/components/list-pagination"
import { MovieCard } from "@/components/movie-card"
import { TvCard } from "@/components/tv-card"

interface TrendListProps {
  type: "movie" | "tv"
  time: "day" | "week"
  page: string
  title?: string
  description?: string
}

export const TrendList: React.FC<TrendListProps> = async ({
  type,
  time,
  page,
  title,
  description,
}) => {
  const {
    results: trends,
    total_pages: totalPages,
    page: currentPage,
  } = await tmdb.trending[type]({
    time,
    page,
  })

  if (!trends?.length) {
    return notFound()
  }

  return (
    <div className="container mt-8 space-y-8">
      <div>
        <h1 className="mb-2 text-2xl font-medium">{title}</h1>
        <p className="max-w-3xl text-muted-foreground">{description}</p>
      </div>

      <div className="grid-list">
        {trends.map((item) =>
          item.media_type === "movie" ? (
            <MovieCard key={item.id} {...item} />
          ) : (
            <TvCard key={item.id} {...item} />
          )
        )}
      </div>

      <ListPagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  )
}

export const SkeletonList = () => (
  <div className="container mt-8">
    <Skeleton className="mb-2 h-6 rounded-md md:w-40" />
    <Skeleton className="mb-1 h-4 w-1/2 rounded-md md:w-60" />
    <Skeleton className="h-4 w-2/3 rounded-md md:w-96" />

    <div className="grid-list mt-8">
      {Array.from({ length: 20 }).map((_, i) => (
        <Skeleton key={i} className="aspect-poster w-full rounded-md" />
      ))}
    </div>
  </div>
)
