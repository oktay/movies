import { Metadata } from "next"
import { notFound } from "next/navigation"
import { tmdb } from "@/tmdb/api"

import { MovieHero } from "@/components/movie-hero"
import { TrendCarousel } from "@/components/trend-carousel"

export const metadata: Metadata = {
  title: "Home",
}

export default async function Home() {
  const { results: movies } = await tmdb.trending.movie({
    time: "day",
    page: "1",
  })

  const { results: tvShows } = await tmdb.trending.tv({
    time: "day",
    page: "1",
  })

  if (!movies) {
    return notFound()
  }

  return (
    <section>
      <div className="container space-y-8">
        <MovieHero movies={movies} label="Trending Now" />

        {movies && (
          <TrendCarousel
            type="movie"
            title="Trending Movies"
            link="/trending/movie"
            items={movies}
          />
        )}

        {tvShows && (
          <TrendCarousel
            type="tv"
            title="Trending TV Shows"
            link="/trending/tv"
            items={tvShows}
          />
        )}
      </div>
    </section>
  )
}
