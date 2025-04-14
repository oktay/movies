import { tmdb } from "@/tmdb/api"
import { WithCredits, WithImages, WithVideos } from "@/tmdb/api/types"
import { DialogProps } from "@radix-ui/react-dialog"

import { getUniqueItems } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MediaCastCard } from "@/components/media-cast-card"
import { MediaCrewCard } from "@/components/media-crew-card"
import { MediaImages } from "@/components/media-images"
import { MediaVideos } from "@/components/media-videos"
import { TvEpisodeCard } from "@/components/tv-episode-card"

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
    videos: { results: videos },
    credits: { cast, crew },
    images: { backdrops, posters },
  } = await tmdb.tvSeasons.details<WithCredits & WithImages & WithVideos>({
    id,
    season,
    append: "credits,videos,images",
    langs: "en",
  })

  const guestStars = getUniqueItems(
    episodes.map((episode) => episode.guest_stars).flat()
  )

  return (
    <Tabs defaultValue="episodes">
      <TabsList>
        <TabsTrigger value="episodes">Episodes</TabsTrigger>
        <TabsTrigger value="cast">Cast</TabsTrigger>
        <TabsTrigger value="guests">Guest Stars</TabsTrigger>
        <TabsTrigger value="crew">Crew</TabsTrigger>
        <TabsTrigger value="images">Images</TabsTrigger>
        <TabsTrigger value="videos">Videos</TabsTrigger>
      </TabsList>

      <TabsContent value="episodes" className="mt-4">
        {episodes?.length ? (
          <div className="space-y-4">
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

      <TabsContent value="images">
        <MediaImages posters={posters} backdrops={backdrops} />
      </TabsContent>

      <TabsContent value="videos">
        <MediaVideos videos={videos} />
      </TabsContent>
    </Tabs>
  )
}
