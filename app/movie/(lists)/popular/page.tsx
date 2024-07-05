import { pages } from "@/config/pages"
import { MovieList } from "@/components/movie-list"

export default function Popular({
  searchParams,
}: {
  searchParams?: Record<string, string>
}) {
  return (
    <MovieList
      list="popular"
      page={searchParams?.page ?? "1"}
      title={pages.movie.popular.title}
      description={pages.movie.popular.description}
    />
  )
}
