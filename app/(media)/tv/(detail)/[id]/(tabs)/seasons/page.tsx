import Link from "next/link"
import { tmdb } from "@/tmdb/api"

import { Badge } from "@/components/ui/badge"
import { MediaCard } from "@/components/media-card"
import { PosterImage } from "@/components/poster-image"

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
        >
          <MediaCard.Root>
            <PosterImage image={season.poster_path} alt={season.name} />
            <MediaCard.Content>
              <Badge className="mb-2">{season.vote_average?.toFixed(1)}</Badge>
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
