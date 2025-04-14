import { notFound } from "next/navigation"
import { tmdb } from "@/tmdb/api"
import { WithCredits } from "@/tmdb/api/types"
import { format } from "@/tmdb/utils"

import { Badge } from "@/components/ui/badge"
import { MediaDetailView } from "@/components/media-detail-view"
import { MediaPoster } from "@/components/media-poster"
import { MediaRating } from "@/components/media-rating"
import { TvSeasonBreadcrumb } from "@/components/tv-season-breadcrumb"
import { TvSeasonDetails } from "@/components/tv-season-details"
import { TvSeasonNavigation } from "@/components/tv-season-navigation"

interface DetailSeasonsProps {
  params: {
    id: string
    season: number
  }
}

export async function generateMetadata({ params }: DetailSeasonsProps) {
  const detail = await tmdb.tv.detail({
    id: params.id,
  })

  const { name } = await tmdb.tvSeasons.details({
    id: params.id,
    season: params.season,
  })

  return {
    title: `${name} - ${detail.name}`,
  }
}

export default async function DetailSeasons({
  params: { id, season },
}: DetailSeasonsProps) {
  const detail = await tmdb.tv.detail({
    id: id,
  })

  const { name, overview, poster_path, vote_average, air_date } =
    await tmdb.tvSeasons.details<WithCredits>({
      id,
      season,
      append: "credits",
    })

  if (!id) return notFound()

  return (
    <MediaDetailView.Root>
      <MediaDetailView.Hero>
        <div className="relative aspect-poster w-full md:w-56">
          <MediaPoster image={poster_path} size="w780" alt={name} priority />
        </div>

        <div className="space-y-4 self-end">
          <TvSeasonBreadcrumb
            id={id}
            season={season}
            seasonName={name}
            showName={detail.name}
          />

          <MediaDetailView.Genres className="items-center">
            <MediaRating average={vote_average} />
            <Badge variant="outline">{format.date(air_date)}</Badge>
          </MediaDetailView.Genres>

          <MediaDetailView.Title>{name}</MediaDetailView.Title>

          <MediaDetailView.Overview
            dangerouslySetInnerHTML={{ __html: format.content(overview) }}
          />
        </div>
      </MediaDetailView.Hero>

      <MediaDetailView.Content className="space-y-4">
        <TvSeasonDetails id={id} season={season} />
        <TvSeasonNavigation id={id} season={season} seasons={detail.seasons} />
      </MediaDetailView.Content>
    </MediaDetailView.Root>
  )
}
