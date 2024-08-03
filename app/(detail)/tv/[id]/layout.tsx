import Link from "next/link"
import { notFound } from "next/navigation"
import { tmdb } from "@/tmdb/api"
import { WithVideos } from "@/tmdb/api/types"
import { format } from "@/tmdb/utils"

import { Tabs, TabsLink, TabsList } from "@/components/ui/tabs"
import { InfoTooltip } from "@/components/info-tooltip"
import { MediaBackdrop } from "@/components/media-backdrop"
import { MediaDetailView } from "@/components/media-detail-view"
import { MediaPoster } from "@/components/media-poster"
import { MediaRating } from "@/components/media-rating"
import { MediaTrailerDialog } from "@/components/media-trailer-dialog"

interface DetailLayoutProps {
  params: {
    id: string
  }
  children: React.ReactNode
}

export async function generateMetadata({ params }: DetailLayoutProps) {
  const { name } = await tmdb.tv.detail({
    id: params.id,
  })

  return {
    title: name,
  }
}

export default async function DetailLayout({
  params,
  children,
}: DetailLayoutProps) {
  const {
    id,
    name,
    overview,
    backdrop_path,
    poster_path,
    genres,
    vote_average,
    vote_count,
    tagline,
    videos,
  } = await tmdb.tv.detail<WithVideos>({
    id: params.id,
    append: "videos",
  })

  if (!id) return notFound()

  return (
    <MediaDetailView.Root>
      <MediaDetailView.Backdrop>
        <MediaBackdrop image={backdrop_path} alt={name} priority />
      </MediaDetailView.Backdrop>

      <MediaDetailView.Hero>
        <MediaDetailView.Poster>
          <MediaPoster image={poster_path} alt={name} size="w780" priority />
        </MediaDetailView.Poster>

        <div className="space-y-4">
          <MediaDetailView.Genres>
            <MediaRating average={vote_average} count={vote_count} />
            {genres?.map((genre) => (
              <Link
                key={genre.id}
                href={`/tv/discover?with_genres=${genre.id}`}
              >
                <MediaDetailView.Genre>{genre.name}</MediaDetailView.Genre>
              </Link>
            ))}
          </MediaDetailView.Genres>

          <MediaDetailView.Title>{name}</MediaDetailView.Title>

          {tagline && (
            <MediaDetailView.Overview>
              &quot;{tagline}&quot;
            </MediaDetailView.Overview>
          )}

          <MediaDetailView.Overview
            dangerouslySetInnerHTML={{ __html: format.content(overview) }}
          />

          <MediaTrailerDialog videos={videos?.results} />
        </div>
      </MediaDetailView.Hero>

      <MediaDetailView.Content>
        <Tabs className="mt-8 lg:mt-12">
          <div className="max-w-screen scrollbar-hidden -mx-8 overflow-x-scroll px-8 lg:m-0 lg:p-0">
            <TabsList>
              <TabsLink href={`/tv/${id}`}>Overview</TabsLink>
              <TabsLink className="gap-2" href={`/tv/${id}/credits`}>
                Credits
                <InfoTooltip>
                  You can see season credits and guest stars in seasons tab.
                </InfoTooltip>
              </TabsLink>
              <TabsLink href={`/tv/${id}/watch`}>Watch</TabsLink>
              <TabsLink href={`/tv/${id}/reviews`}>Reviews</TabsLink>
              <TabsLink href={`/tv/${id}/seasons`}>Seasons</TabsLink>
              <TabsLink href={`/tv/${id}/images`}>Images</TabsLink>
              <TabsLink href={`/tv/${id}/videos`}>Videos</TabsLink>
              <TabsLink href={`/tv/${id}/recommendations`}>
                Recommendations
              </TabsLink>
              <TabsLink href={`/tv/${id}/similar`}>Similar</TabsLink>
            </TabsList>
          </div>
        </Tabs>
        <div className="mt-4">{children}</div>
      </MediaDetailView.Content>
    </MediaDetailView.Root>
  )
}
