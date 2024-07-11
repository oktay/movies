import Link from "next/link"
import { tmdb } from "@/tmdb/api"
import { format } from "@/tmdb/utils"
import { ArrowLeft } from "lucide-react"

import { cn, pad, pluralize } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Backdrop } from "@/components/backdrop"
import { Rating } from "@/components/rating"

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
  const { episodes, name } = await tmdb.tvSeasons.details({
    id,
    season,
  })

  return (
    <section>
      <div className="grid grid-cols-3 place-items-start rounded-md border p-1">
        <Link
          href={`/tv/${id}/seasons`}
          className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
          prefetch={false}
        >
          <ArrowLeft className="size-4 md:mr-2" />
          <span className="sr-only md:not-sr-only">Back</span>
        </Link>

        <h2 className="place-self-center text-sm font-medium">{name}</h2>

        <div className="place-self-end self-center pr-2 text-xs text-muted-foreground">
          {episodes?.length} {pluralize(episodes.length, "episode", "episodes")}
        </div>
      </div>

      {episodes?.length ? (
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {episodes.map(
            ({
              id,
              still_path,
              name,
              episode_number,
              vote_average,
              vote_count,
              air_date,
              overview,
            }) => (
              <div key={id}>
                <div className="relative aspect-video" key={id}>
                  <Backdrop image={still_path} alt={name} size="w780" />
                </div>

                <div className="mt-4">
                  <div className="flex justify-between">
                    <h3>
                      <span className="text-muted-foreground">
                        E{pad(episode_number)}
                      </span>{" "}
                      {name}
                    </h3>

                    <Rating
                      average={vote_average}
                      count={vote_count}
                      className="h-5"
                    />
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
