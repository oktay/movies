import { tmdb } from "@/tmdb/api"

import { ListPagination } from "@/components/list-pagination"
import { TvCard } from "@/components/tv-card"

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
          <TvCard key={tv.id} {...tv} />
        ))}
      </section>
      <ListPagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  )
}
