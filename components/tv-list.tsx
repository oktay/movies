import Link from "next/link"
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
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {data.results?.map((tvShow) => (
            <Link href={`/tv/${tvShow.id}`} key={tvShow.id}>
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
