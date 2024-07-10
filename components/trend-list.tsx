import Link from "next/link"
import { notFound } from "next/navigation"
import { tmdb } from "@/tmdb/api"
import { format } from "@/tmdb/utils"

import { Skeleton } from "@/components/ui/skeleton"
import { ListPagination } from "@/components/list-pagination"
import { MediaCard } from "@/components/media-card"
import { Poster } from "@/components/poster"
import { Rating } from "@/components/rating"

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
    results,
    total_pages: totalPages,
    page: currentPage,
  } = await tmdb.trending[type]({
    time,
    page,
  })

  if (!results?.length) {
    return notFound()
  }

  const trends = results.map((item) => {
    const isMovie = item.media_type === "movie"
    return {
      ...item,
      title: isMovie ? item.title : item.name,
      date: isMovie ? item.release_date : item.first_air_date,
    }
  })

  return (
    <div className="container mt-8 space-y-8">
      <div>
        <h1 className="mb-2 text-2xl font-medium">{title}</h1>
        <p className="max-w-3xl text-muted-foreground">{description}</p>
      </div>

      <div className="grid-list">
        {trends.map((item) => (
          <Link
            href={`/${item.media_type}/${item.id}`}
            key={item.id}
            prefetch={false}
          >
            <MediaCard.Root>
              <Poster image={item.poster_path} alt={item.title} />
              <MediaCard.Content>
                <Rating
                  average={item.vote_average}
                  count={item.vote_count}
                  className="mb-2"
                />
                <MediaCard.Title>{item.title}</MediaCard.Title>
                <MediaCard.Excerpt>{format.year(item.date)}</MediaCard.Excerpt>
              </MediaCard.Content>
            </MediaCard.Root>
          </Link>
        ))}
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
