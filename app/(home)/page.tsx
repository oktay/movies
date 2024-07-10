import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { tmdb } from "@/tmdb/api"
import { ArrowRight } from "lucide-react"

import { getRandomItems } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Backdrop } from "@/components/backdrop"
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

  const [hero] = getRandomItems(movies, 1)

  return (
    <section>
      <div className="container mt-8 space-y-8">
        <div className="h-hero relative">
          <Backdrop image={hero.backdrop_path} alt={hero.title} />

          <div className="overlay">
            <div className="mx-auto max-w-3xl space-y-4 p-4 pb-8 text-center md:p-12">
              <Badge className="select-none">Trending Now</Badge>

              <h1 className="line-clamp-2 text-xl font-medium leading-tight tracking-tighter md:text-4xl">
                {hero.title}
              </h1>
              <p className="line-clamp-3 text-sm text-muted-foreground md:text-lg">
                {hero.overview}
              </p>

              <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
                <Link
                  href={`/movie/${hero.id}`}
                  className={buttonVariants({
                    size: "lg",
                    variant: "default",
                  })}
                >
                  Details <ArrowRight className="ml-2 size-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

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
