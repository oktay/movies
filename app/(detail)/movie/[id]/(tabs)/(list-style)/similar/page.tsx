import { tmdb } from "@/tmdb/api"

import { ListPagination } from "@/components/list-pagination"
import { MovieCard } from "@/components/movie-card"

interface DetailSimilarProps {
  params: {
    id: string
  }
  searchParams: {
    page: string
  }
}

export const metadata = {
  title: "Similar",
}

export default async function DetailSimilar({
  params,
  searchParams,
}: DetailSimilarProps) {
  const {
    results: movies,
    total_pages: totalPages,
    page: currentPage,
  } = await tmdb.movie.similar({
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
