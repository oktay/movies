import Link from "next/link"
import { tmdb } from "@/tmdb/api"

import { MediaCard } from "@/components/media-card"
import { Poster } from "@/components/poster"
import { Rating } from "@/components/rating"

interface DetailSeasonsProps {
  params: {
    id: string
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

export default async function DetailSeasons({ params }: DetailSeasonsProps) {
  const { seasons } = await tmdb.tv.detail({
    id: params.id,
  })

  if (!seasons) return <div className="empty-box">No seasons</div>

  return (
    <section className="grid-list">
      {seasons.map((season) => (
        <Link
          key={season.id}
          href={`/tv/${params.id}/seasons/${season.season_number}`}
          prefetch={false}
          scroll={false}
        >
          <MediaCard.Root>
            <Poster image={season.poster_path} alt={season.name} />
            <MediaCard.Content>
              <Rating average={season.vote_average} className="mb-2" />
              <MediaCard.Title>{season.name}</MediaCard.Title>
              <MediaCard.Excerpt>
                {season.episode_count} Episodes
              </MediaCard.Excerpt>
            </MediaCard.Content>
          </MediaCard.Root>
        </Link>
      ))}
    </section>
  )
}
