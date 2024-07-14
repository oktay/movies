import { tmdb } from "@/tmdb/api"

import { ListPagination } from "@/components/list-pagination"
import { MovieCard } from "@/components/movie-card"

interface DetailRecommendationsProps {
  params: {
    id: string
  }
  searchParams: {
    page: string
  }
}

export async function generateMetadata({ params }: DetailRecommendationsProps) {
  const { title } = await tmdb.movie.detail({
    id: params.id,
  })

  return {
    title: `Recommendations - ${title}`,
  }
}

export default async function DetailRecommendations({
  params,
  searchParams,
}: DetailRecommendationsProps) {
  const {
    results: movies,
    total_pages: totalPages,
    page: currentPage,
  } = await tmdb.movie.recommendations({
    id: params.id,
    page: searchParams.page,
  })

  if (!movies?.length) {
    return <div className="empty-box">No recommendations</div>
  }

  return (
    <div className="space-y-4">
      <section className="grid-list">
        {movies.map((movie) => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </section>
      <ListPagination totalPages={totalPages} currentPage={currentPage} />
    </div>
  )
}
