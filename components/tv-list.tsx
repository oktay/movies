import Link from "next/link"
import { notFound } from "next/navigation"
import { tmdb } from "@/tmdb/api"
import { TvListType } from "@/tmdb/api/types"
import { format } from "@/tmdb/utils"

import { ListPagination } from "@/components/list-pagination"
import { MediaCard } from "@/components/media-card"
import { Poster } from "@/components/poster"
import { Rating } from "@/components/rating"

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
  const {
    results: tvShows,
    total_pages: totalPages,
    page: currentPage,
  } = await tmdb.tv.list({
    list: list,
    page,
  })

  if (!tvShows?.length) {
    return notFound()
  }

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
              <Poster image={tvShow.poster_path} alt={tvShow.name} />
              <MediaCard.Content>
                <Rating
                  average={tvShow.vote_average}
                  count={tvShow.vote_count}
                  className="mb-2"
                />
                <MediaCard.Title>{tvShow.name}</MediaCard.Title>
                <MediaCard.Excerpt>
                  {format.year(tvShow.first_air_date)}
                </MediaCard.Excerpt>
              </MediaCard.Content>
            </MediaCard.Root>
          </Link>
        ))}
      </div>

      <ListPagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  )
}
