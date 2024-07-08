import Link from "next/link"
import { notFound } from "next/navigation"
import { tmdb } from "@/tmdb/api"
import { TvListType } from "@/tmdb/api/types"

import { ListPagination } from "@/components/list-pagination"

import { MediaCard } from "./media-card"
import { PosterImage } from "./poster-image"

export const TVList = async ({
  list,
  page,
  title,
  description,
}: {
  list: TvListType
  page: string
  title?: string
  description?: string
}) => {
  const data = await tmdb.tv.list({
    list: list,
    page,
  })

  if (!data.results) {
    return notFound()
  }

  const currentPage = parseInt(page)
  const totalPages = data.total_pages > 500 ? 500 : data.total_pages

  return (
    <div className="container py-8">
      {(title || description) && (
        <div className="mb-8">
          {title && <h1 className="mb-2 text-2xl font-medium">{title}</h1>}
          {description && (
            <p className="max-w-3xl text-muted-foreground">{description}</p>
          )}
        </div>
      )}

      <div className="space-y-8">
        <div className="grid-list">
          {data.results?.map((tvShow) => (
            <Link href={`/tv/${tvShow.id}`} key={tvShow.id} className="w-full">
              <MediaCard.Root>
                <PosterImage
                  image={tvShow.poster_path}
                  alt={tvShow.name}
                  size="w500"
                />
                <MediaCard.Content>
                  <MediaCard.Title>{tvShow.name}</MediaCard.Title>
                  <MediaCard.Excerpt>{tvShow.overview}</MediaCard.Excerpt>
                </MediaCard.Content>
              </MediaCard.Root>
            </Link>
          ))}
        </div>
        <ListPagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </div>
  )
}
