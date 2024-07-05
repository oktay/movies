import Link from "next/link"
import { tmdb } from "@/tmdb/api"
import { Movie, TvShow } from "@/tmdb/models"
import { ArrowRight } from "lucide-react"

import { cn, getRandomItems } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { BackdropImage } from "@/components/backdrop-image"
import { TrendCarousel } from "@/components/trend-carousel"

export default async function IndexPage() {
  const { results: movies } = await tmdb.trending.movie({
    time: "day",
    page: "1",
  })

  const { results: tvShows } = await tmdb.trending.tv({
    time: "day",
    page: "1",
  })

  const random = getRandomItems([
    ...movies.filter((movie) => movie.backdrop_path),
    ...tvShows.filter((tv) => tv.backdrop_path),
  ])[0]

  const hero = {
    ...random,
    title: (random as Movie).title || (random as TvShow).name,
    type: random.media_type === "movie" ? "Movie" : "TV Show",
  }

  return (
    <section>
      <div className="container mt-8">
        <div className="card-border h-hero relative">
          <BackdropImage image={hero.backdrop_path} alt={hero.title} />

          <div className="overlay">
            <div className="mx-auto max-w-3xl p-12 text-center">
              <Badge className="mb-2">{hero.type}</Badge>
              <h1 className="text-3xl font-medium leading-tight tracking-tighter md:text-4xl">
                {hero.title}
              </h1>
              <p className="mt-4 line-clamp-3 text-lg text-muted-foreground">
                {hero.overview}
              </p>
              <Link
                href={`/${hero.media_type}/${hero.id}`}
                className={cn(buttonVariants({ size: "lg" }), "mt-6")}
              >
                Details <ArrowRight className="ml-2 size-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-12 space-y-12">
        <TrendCarousel
          type="movie"
          title="Trending Movies"
          link="/trending/movie"
          items={movies}
        />

        <TrendCarousel
          type="tv"
          title="Trending TV Shows"
          link="/trending/tv"
          items={tvShows}
        />
      </div>
    </section>
  )
}
