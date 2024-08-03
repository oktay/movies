import { tmdb } from "@/tmdb/api"
import { WithCredits } from "@/tmdb/api/types"
import { DialogProps } from "@radix-ui/react-dialog"

import { getUniqueItems } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MediaCastCard } from "@/components/media-cast-card"
import { MediaCrewCard } from "@/components/media-crew-card"
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
  const {
    episodes,
    name,
    overview,
    credits: { cast, crew },
  } = await tmdb.tvSeasons.details<WithCredits>({
    id,
    season,
    append: "credits",
  })

  const guestStars = getUniqueItems(
    episodes.map((episode) => episode.guest_stars).flat()
  )

  return (
    <TvSeasonDialog name={name} overview={overview} {...props}>
      <Tabs defaultValue="episodes">
        <TabsList>
          <TabsTrigger value="episodes">Episodes</TabsTrigger>
          <TabsTrigger value="cast">Cast</TabsTrigger>
          <TabsTrigger value="guests">Guest Stars</TabsTrigger>
          <TabsTrigger value="crew">Crew</TabsTrigger>
        </TabsList>

        <TabsContent value="episodes">
          {episodes?.length ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {episodes.map((episode) => (
                <TvEpisodeCard key={episode.id} {...episode} />
              ))}
            </div>
          ) : (
            <div className="empty-box">No episodes</div>
          )}
        </TabsContent>

        <TabsContent value="cast">
          {cast?.length ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {cast.map((cast) => (
                <MediaCastCard key={cast.credit_id} {...cast} />
              ))}
            </div>
          ) : (
            <div className="empty-box">No cast</div>
          )}
        </TabsContent>

        <TabsContent value="guests">
          {guestStars?.length ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {guestStars.map((cast) => (
                <MediaCastCard key={cast.credit_id} {...cast} />
              ))}
            </div>
          ) : (
            <div className="empty-box">No guest stars</div>
          )}
        </TabsContent>

        <TabsContent value="crew">
          {crew?.length ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {crew.map((crew) => (
                <MediaCrewCard key={crew.credit_id} {...crew} />
              ))}
            </div>
          ) : (
            <div className="empty-box">No crew</div>
          )}
        </TabsContent>
      </Tabs>
    </TvSeasonDialog>
  )
}
