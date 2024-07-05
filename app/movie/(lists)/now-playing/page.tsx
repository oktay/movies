import { pages } from "@/config/pages"
import { MovieList } from "@/components/movie-list"

export default async function NowPlaying({
  searchParams,
}: {
  searchParams?: Record<string, string>
}) {
  return (
    <MovieList
      list="now_playing"
      page={searchParams?.page ?? "1"}
      title={pages.movie.nowPlaying.title}
      description={pages.movie.nowPlaying.description}
    />
  )
}
