import { Metadata } from "next"
import { cookies } from "next/headers"
import { pages } from "@/config"
import { tmdb } from "@/tmdb/api"
import { ClapperboardIcon, HeartIcon, TvIcon } from "lucide-react"

import { getCountryName } from "@/lib/utils"
import { MovieHero } from "@/components/movie/movie-hero"
import { TrendCarousel } from "@/components/trend/trend-carousel"
import { TvHero } from "@/components/tv/tv-hero"

export const metadata: Metadata = {
  title: "Home",
}

export default async function Home() {
  const region = cookies().get("region")?.value || "US"

  const { results: movies } = await tmdb.trending.movie({
    time: "day",
    page: "1",
  })

  const { results: popularMovies } = await tmdb.movie.list({
    list: "popular",
    page: "1",
    region,
  })

  const { results: tvShows } = await tmdb.trending.tv({
    time: "day",
    page: "1",
  })

  const { results: popularTv } = await tmdb.tv.list({
    list: "popular",
    page: "1",
    region,
  })

  return (
    <section>
      <div className="container space-y-8">
        <MovieHero movies={movies} label="Trending Now" priority />

        <TrendCarousel
          type="movie"
          title="Trending Movies"
          description={pages.trending.movie.description}
          icon={<ClapperboardIcon className="size-6" />}
          link={pages.trending.movie.link}
          items={movies}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <MovieHero
            movies={movies.slice(0, 10)}
            label="Trending Now"
            count={2}
          />
        </div>

        <TrendCarousel
          type="movie"
          title={`Popular Movies in ${getCountryName(region)}`}
          description={pages.movie.popular.description}
          icon={<HeartIcon className="size-6" />}
          link={pages.movie.popular.link}
          items={popularMovies.map((movie) => ({
            ...movie,
            media_type: "movie",
          }))}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <TvHero
            tvShows={tvShows.slice(0, 10)}
            label="Trending Now"
            count={2}
          />
        </div>

        <TrendCarousel
          type="tv"
          title="Trending TV Shows"
          description={pages.trending.tv.description}
          icon={<TvIcon className="size-6" />}
          link={pages.trending.tv.link}
          items={tvShows}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <MovieHero
            movies={movies.slice(10, 20)}
            label="Trending Now"
            count={2}
          />
        </div>

        <TrendCarousel
          type="tv"
          title={`Popular TV Shows in ${getCountryName(region)}`}
          description={pages.tv.popular.description}
          icon={<HeartIcon className="size-6" />}
          link={pages.tv.popular.link}
          items={popularTv.map((tv) => ({ ...tv, media_type: "tv" }))}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <TvHero
            tvShows={tvShows.slice(10, 20)}
            label="Trending Now"
            count={2}
          />
        </div>
      </div>
    </section>
  )
}
