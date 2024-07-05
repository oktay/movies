import { pages } from "@/config/pages"
import { MovieList } from "@/components/movie-list"

export default async function Upcoming({
  searchParams,
}: {
  searchParams?: Record<string, string>
}) {
  return (
    <MovieList
      list="upcoming"
      page={searchParams?.page ?? "1"}
      title={pages.movie.upcoming.title}
      description={pages.movie.upcoming.description}
    />
  )
}
