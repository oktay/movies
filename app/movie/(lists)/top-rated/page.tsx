import { pages } from "@/config/pages"
import { MovieList } from "@/components/movie-list"

export default async function TopRated({
  searchParams,
}: {
  searchParams?: Record<string, string>
}) {
  return (
    <MovieList
      list="top_rated"
      page={searchParams?.page ?? "1"}
      title={pages.movie.topRated.title}
      description={pages.movie.topRated.description}
    />
  )
}
