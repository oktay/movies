import { tmdb } from "@/tmdb/api"
import { WithCredits, WithImages } from "@/tmdb/api/types"
import { TabsProps } from "@radix-ui/react-tabs"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs"

import { MediaCreditsList } from "@/components/media-credits-list"
import { MediaImages } from "@/components/media-images"

interface TvEpisodeDetailsProps extends TabsProps {
  id: string
  season: number
  episode: number
}

export const TvEpisodeDetails = async ({
  id,
  season,
  episode,
  ...props
}: TvEpisodeDetailsProps) => {
  const { credits, guest_stars, images } = await tmdb.tvEpisodes.details<
    WithCredits & WithImages
  >({
    id,
    season,
    episode,
    append: "credits,images",
  })

  return (
    <Tabs defaultValue="images" {...props}>
      <TabsList>
        <TabsTrigger value="images">Images</TabsTrigger>
        <TabsTrigger value="credits">Credits</TabsTrigger>
      </TabsList>

      <TabsContent className="mt-4" value="images">
        <MediaImages backdrops={images?.stills} />
      </TabsContent>

      <TabsContent className="mt-4" value="credits">
        <MediaCreditsList
          cast={credits.cast}
          crew={credits.crew}
          guestStars={guest_stars}
        />
      </TabsContent>
    </Tabs>
  )
}
