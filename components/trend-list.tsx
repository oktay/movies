import Link from "next/link"
import { notFound } from "next/navigation"
import { tmdb } from "@/tmdb/api"
import { MovieWithMediaType, TvShowWithMediaType } from "@/tmdb/models"

import { ListPagination } from "@/components/list-pagination"
import { MediaCard } from "@/components/media-card"
import { Poster } from "@/components/poster"

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

  const trends = results.map((item) => ({
    ...item,
    title:
      (item as MovieWithMediaType).title || (item as TvShowWithMediaType).name,
  }))

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
              <Poster image={item.poster_path} alt={item.title} size="w500" />
              <MediaCard.Content>
                <MediaCard.Title>{item.title}</MediaCard.Title>
                <MediaCard.Excerpt>{item.overview}</MediaCard.Excerpt>
              </MediaCard.Content>
            </MediaCard.Root>
          </Link>
        ))}
      </div>

      <ListPagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  )
}
