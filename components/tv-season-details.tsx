import { tmdb } from "@/tmdb/api"
import { WithCredits, WithImages, WithVideos } from "@/tmdb/api/types"
import { TabsProps } from "@radix-ui/react-tabs"

import { getUniqueItems } from "@/lib/utils"
import { SeparatorLabel } from "@/components/ui/separator-label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MediaCastCard } from "@/components/media-cast-card"
import { MediaCrewCard } from "@/components/media-crew-card"
import { MediaImages } from "@/components/media-images"
import { MediaVideos } from "@/components/media-videos"
import { MediaWatchProviders } from "@/components/media-watch-providers"
import { TvEpisodeCard } from "@/components/tv-episode-card"

interface TvSeasonDetailsProps extends TabsProps {
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
    <Tabs defaultValue="episodes" {...props}>
      <div className="max-w-screen scrollbar-hidden -mx-8 overflow-x-scroll px-8 lg:m-0 lg:p-0">
        <TabsList>
          <TabsTrigger value="episodes">Episodes</TabsTrigger>
          <TabsTrigger value="watch">Watch</TabsTrigger>
          <TabsTrigger value="credits">Credits</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
        </TabsList>
      </div>

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

      <TabsContent value="watch">
        <MediaWatchProviders id={id} season={season} type="tv" />
      </TabsContent>

      <TabsContent value="credits">
        <section className="space-y-12">
          {cast.length > 0 ? (
            <div className="grid-list">
              {cast.map((cast) => (
                <MediaCastCard key={cast.credit_id} {...cast} />
              ))}
            </div>
          ) : (
            <div className="empty-box">No cast</div>
          )}

          <SeparatorLabel>Guest Stars</SeparatorLabel>

          {guestStars?.length ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {guestStars.map((cast) => (
                <MediaCastCard key={cast.credit_id} {...cast} />
              ))}
            </div>
          ) : (
            <div className="empty-box">No guest stars</div>
          )}

          <SeparatorLabel>Crew</SeparatorLabel>

          {crew.length > 0 ? (
            <div className="grid-list">
              {crew.map((crew) => (
                <MediaCrewCard key={crew.credit_id} {...crew} />
              ))}
            </div>
          ) : (
            <div className="empty-box">No crew</div>
          )}
        </section>
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
