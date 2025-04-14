import { Fragment } from "react"
import Link from "next/link"
import { tmdb } from "@/tmdb/api"

import { MediaCard } from "@/components/media-card"
import { MediaPoster } from "@/components/media-poster"
import { MediaRating } from "@/components/media-rating"

interface DetailSeasonsProps {
  params: {
    id: string
  }
  searchParams: {
    s: string
  }
}

export const metadata = {
  title: {
    default: "Seasons",
    template: "%s - Seasons",
  },
}

export default async function DetailSeasons({ params }: DetailSeasonsProps) {
  const { seasons } = await tmdb.tv.detail({
    id: params.id,
  })

  if (!seasons) return <div className="empty-box">No seasons</div>

  return (
    <section className="grid-list">
      {seasons.map((season) => (
        <Fragment key={season.id}>
          <Link
            href={`/tv/${params.id}/seasons/${season.season_number}`}
            prefetch={false}
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
        </Fragment>
      ))}
    </section>
  )
}
