import Link from "next/link"
import { tmdb } from "@/tmdb/api"
import { format } from "@/tmdb/utils"
import { ArrowLeft } from "lucide-react"

import { cn, pad, pluralize } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Backdrop } from "@/components/backdrop"
import { Poster } from "@/components/poster"

interface DetailSeasonProps {
  params: {
    id: string
    season: number
  }
}

export async function generateMetadata({ params }: DetailSeasonProps) {
  const { name } = await tmdb.tv.detail({
    id: params.id,
  })

  return {
    title: `Season ${params.season} - ${name}`,
  }
}

export default async function DetailSeason({
  params: { id, season },
}: DetailSeasonProps) {
  const { episodes, poster_path, name, overview, air_date } =
    await tmdb.tvSeasons.details({
      id,
      season,
    })

  return (
    <section>
      <div className="flex items-start pb-4">
        <div className="relative aspect-poster w-20 md:w-32">
          <Poster image={poster_path} alt={name} size="w185" className="card" />
        </div>

        <div className="flex flex-1 flex-col self-stretch pl-4 md:py-4 md:pl-6">
          <h1 className="text-lg font-semibold">{name}</h1>
          <div
            className="mb-2 line-clamp-6 text-sm text-muted-foreground"
            dangerouslySetInnerHTML={{
              __html: format.content(overview || "<em>No details</em>"),
            }}
          />
          <p className="mt-auto text-sm">{format.date(air_date)}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 place-items-start rounded-md border p-2">
        <Link
          href={`/tv/${id}/seasons`}
          className={cn(
            buttonVariants({
              variant: "ghost",
              size: "sm",
            }),
            "w-auto pl-4"
          )}
        >
          <ArrowLeft className="size-4 md:mr-2" />
          <span className="sr-only md:not-sr-only">Back</span>
        </Link>

        <h2 className="place-self-center text-sm font-medium">Episodes</h2>

        <div className="place-self-end self-center pr-2 text-xs text-muted-foreground">
          {episodes?.length} {pluralize(episodes.length, "episode", "episodes")}
        </div>
      </div>

      {episodes?.length ? (
        <div className="grid gap-4 py-4 md:grid-cols-2 lg:grid-cols-3">
          {episodes.map(
            ({
              id,
              still_path,
              name,
              episode_number,
              vote_average,
              air_date,
              overview,
            }) => (
              <div key={id}>
                <div className="relative aspect-video" key={id}>
                  <Backdrop
                    className="card"
                    image={still_path}
                    alt={name}
                    size="w780"
                  />
                </div>

                <div className="mt-4">
                  <div className="flex justify-between">
                    <h3>
                      <span className="text-muted-foreground">
                        E{pad(episode_number)}
                      </span>{" "}
                      {name}
                    </h3>

                    <Badge className="h-5">
                      {vote_average > 0
                        ? vote_average?.toFixed(1)
                        : "Not rated"}
                    </Badge>
                  </div>

                  <div
                    className="mt-2 line-clamp-6 space-y-2 text-sm"
                    dangerouslySetInnerHTML={{
                      __html: format.content(overview || "<em>No details</em>"),
                    }}
                  />

                  <p className="mt-2 text-xs text-muted-foreground">
                    {air_date && format.date(air_date)}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      ) : (
        <div className="empty-box mt-4">No episodes</div>
      )}
    </section>
  )
}
