import Link from "next/link"
import { notFound } from "next/navigation"
import { tmdb } from "@/tmdb/api"
import { TvListType } from "@/tmdb/api/types"

import { ListPagination } from "@/components/list-pagination"
import { MediaCard } from "@/components/media-card"
import { Poster } from "@/components/poster"

interface TvListProps {
  list: TvListType
  page: string
  title: string
  description?: string
}

export const TvList: React.FC<TvListProps> = async ({
  list,
  page,
  title,
  description,
}) => {
  const { results: tvShows, total_pages } = await tmdb.tv.list({
    list: list,
    page,
  })

  if (!tvShows) {
    return notFound()
  }

  const currentPage = parseInt(page)
  const totalPages = total_pages > 500 ? 500 : total_pages

  return (
    <div className="container space-y-8 py-8">
      <div>
        <h1 className="mb-2 text-2xl font-medium">{title}</h1>
        <p className="max-w-3xl text-muted-foreground">{description}</p>
      </div>

      <div className="grid-list">
        {tvShows?.map((tvShow) => (
          <Link
            href={`/tv/${tvShow.id}`}
            key={tvShow.id}
            className="w-full"
            prefetch={false}
          >
            <MediaCard.Root>
              <Poster
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
  )
}
