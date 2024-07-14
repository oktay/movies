import { tmdb } from "@/tmdb/api"
import { DialogProps } from "@radix-ui/react-dialog"

import { TvEpisodeCard } from "@/components/tv-episode-card"
import { TvSeasonDialog } from "@/components/tv-season-dialog"

interface TvSeasonDetailsProps extends DialogProps {
  id: string
  season: number
}

export const TvSeasonDetails: React.FC<TvSeasonDetailsProps> = async ({
  id,
  season,
  ...props
}) => {
  const { episodes, name, overview } = await tmdb.tvSeasons.details({
    id,
    season,
  })

  return (
    <TvSeasonDialog name={name} overview={overview} {...props}>
      {episodes?.length ? (
        <div className="grid gap-4 sm:grid-cols-3">
          {episodes.map((episode) => (
            <TvEpisodeCard key={episode.id} {...episode} />
          ))}
        </div>
      ) : (
        <div className="empty-box">No episodes</div>
      )}
    </TvSeasonDialog>
  )
}
