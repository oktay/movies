import Link from "next/link"
import { tmdb } from "@/tmdb/api"
import { ArrowLeft } from "lucide-react"

import { cn, getFullDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { MediaCard } from "@/components/media-card"
import { PosterImage } from "@/components/poster-image"

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
  const { episodes, air_date, name } = await tmdb.tvSeasons.details({
    id,
    season,
  })

  return (
    <section>
      <div className="mb-4 flex gap-2 rounded-md border p-4">
        <Link
          href={`/tv/${id}/seasons`}
          className={cn(
            buttonVariants({
              variant: "ghost",
              size: "icon",
            })
          )}
        >
          <ArrowLeft className="size-4" />
          <span className="sr-only">Back</span>
        </Link>

        <div className="mt-1">
          <h2 className="text-xl font-medium">{name}</h2>
          {air_date && (
            <p className="text-muted-foreground">{getFullDate(air_date)}</p>
          )}
        </div>
      </div>

      {episodes?.length ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {episodes.map((episode) => (
            <div key={episode.id}>
              <MediaCard.Root
                className="aspect-square md:aspect-[21/9]"
                key={episode.id}
              >
                <PosterImage image={episode.still_path} alt={episode.name} />
              </MediaCard.Root>
              <div className="mt-2">
                <MediaCard.Title>
                  E{episode.episode_number}: {episode.name}
                </MediaCard.Title>
                <MediaCard.Excerpt className="line-clamp-6 max-w-xl">
                  {episode.overview || <em>No details</em>}
                </MediaCard.Excerpt>
                <Badge className="mt-2">
                  {episode.vote_average > 0
                    ? episode.vote_average?.toFixed(1)
                    : "Not rated"}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-box">No episodes</div>
      )}
    </section>
  )
}
