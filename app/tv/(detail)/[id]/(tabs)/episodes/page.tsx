import { tmdb } from "@/tmdb/api"

import { Badge } from "@/components/ui/badge"
import { MediaCard } from "@/components/media-card"
import { PosterImage } from "@/components/poster-image"
import { SeasonDialog } from "@/components/season-dialog"

export default async function DetailEpisodes({
  params,
}: {
  params: {
    id: string
  }
}) {
  const { seasons } = await tmdb.tv.detail({
    id: params.id,
  })

  if (!seasons) return <div className="empty-box">No episodes</div>

  return (
    <div className="grid-list">
      {seasons.map((season) => (
        <SeasonDialog
          key={season.id}
          id={params.id}
          season={season.season_number}
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
        </SeasonDialog>
      ))}
    </div>
  )
}
