import Link from "next/link"
import { tmdb } from "@/tmdb/api"
import { format } from "@/tmdb/utils"

import { ListPagination } from "@/components/list-pagination"
import { MediaCard } from "@/components/media-card"
import { Poster } from "@/components/poster"
import { Rating } from "@/components/rating"

interface DetailRecommendationsProps {
  params: {
    id: string
  }
  searchParams: {
    page: string
  }
}

export async function generateMetadata({ params }: DetailRecommendationsProps) {
  const { name } = await tmdb.tv.detail({
    id: params.id,
  })

  return {
    title: `Recommendations - ${name}`,
  }
}

export default async function DetailRecommendations({
  params,
  searchParams,
}: DetailRecommendationsProps) {
  const {
    results: tvShows,
    total_pages: totalPages,
    page: currentPage,
  } = await tmdb.tv.recommendations({
    id: params.id,
    page: searchParams.page,
  })

  if (!tvShows?.length) {
    return <div className="empty-box">No recommendations</div>
  }

  return (
    <div className="space-y-4">
      <section className="grid-list">
        {tvShows.map((tv) => (
          <Link href={`/tv/${tv.id}`} key={tv.id} prefetch={false}>
            <MediaCard.Root>
              <Poster image={tv.poster_path} alt={tv.name} />
              <MediaCard.Content>
                <Rating
                  average={tv.vote_average}
                  count={tv.vote_count}
                  className="mb-2"
                />
                <MediaCard.Title>{tv.name}</MediaCard.Title>
                <MediaCard.Excerpt>
                  {format.year(tv.first_air_date)}
                </MediaCard.Excerpt>
              </MediaCard.Content>
            </MediaCard.Root>
          </Link>
        ))}
      </section>
      <ListPagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  )
}
