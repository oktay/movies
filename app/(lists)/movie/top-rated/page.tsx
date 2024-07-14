import { pages } from "@/config"

import { MovieList } from "@/components/movie-list"

interface ListPageProps {
  searchParams?: Record<string, string>
}

export async function generateMetadata() {
  return {
    title: "Top Rated Movies",
    description: pages.movie.topRated.description,
  }
}

export default async function TopRated({ searchParams }: ListPageProps) {
  return (
    <MovieList
      list="top_rated"
      page={searchParams?.page ?? "1"}
      title={pages.movie.topRated.title}
      description={pages.movie.topRated.description}
    />
  )
}
