import { tmdb } from "@/tmdb/api"
import { WithCredits, WithImages, WithVideos } from "@/tmdb/api/types"
import { TabsProps } from "@radix-ui/react-tabs"

import { getUniqueItems } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MediaCreditsList } from "@/components/media/media-credits-list"
import { MediaImages } from "@/components/media/media-images"
import { MediaVideos } from "@/components/media/media-videos"
import { MediaWatchProviders } from "@/components/media/media-watch-providers"
import { TvEpisodeCard } from "@/components/tv/tv-episode-card"

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
        <MediaCreditsList cast={cast} crew={crew} guestStars={guestStars} />
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
