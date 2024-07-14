import { Fragment } from "react"
import Link from "next/link"
import { tmdb } from "@/tmdb/api"

import { MediaCard } from "@/components/media-card"
import { MediaPoster } from "@/components/media-poster"
import { MediaRating } from "@/components/media-rating"
import { TvSeasonDetails } from "@/components/tv-season-details"

interface DetailSeasonsProps {
  params: {
    id: string
  }
  searchParams: {
    s: string
  }
}

export async function generateMetadata({ params }: DetailSeasonsProps) {
  const { name } = await tmdb.tv.detail({
    id: params.id,
  })

  return {
    title: `Seasons - ${name}`,
  }
}

export default async function DetailSeasons({
  params,
  searchParams,
}: DetailSeasonsProps) {
  const { seasons } = await tmdb.tv.detail({
    id: params.id,
  })

  if (!seasons) return <div className="empty-box">No seasons</div>

  return (
    <section className="grid-list">
      {seasons.map((season) => (
        <Fragment key={season.id}>
          <Link
            href={`/tv/${params.id}/seasons?s=${season.season_number}`}
            prefetch={false}
            replace
            scroll={false}
          >
            <MediaCard.Root>
              <MediaPoster image={season.poster_path} alt={season.name} />
              <MediaCard.Content>
                <MediaRating average={season.vote_average} className="mb-2" />
                <MediaCard.Title>{season.name}</MediaCard.Title>
                <MediaCard.Excerpt>
                  {season.episode_count} Episodes
                </MediaCard.Excerpt>
              </MediaCard.Content>
            </MediaCard.Root>
          </Link>

          {parseInt(searchParams.s) === season.season_number && (
            <TvSeasonDetails id={params.id} season={season.season_number} />
          )}
        </Fragment>
      ))}
    </section>
  )
}
