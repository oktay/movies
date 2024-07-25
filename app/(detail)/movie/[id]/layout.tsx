import Link from "next/link"
import { notFound } from "next/navigation"
import { tmdb } from "@/tmdb/api"
import { format } from "@/tmdb/utils"
import { Globe, Play } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { Tabs, TabsLink, TabsList } from "@/components/ui/tabs"
import { MediaBackdrop } from "@/components/media-backdrop"
import { MediaDetailView } from "@/components/media-detail-view"
import { MediaPoster } from "@/components/media-poster"
import { MediaRating } from "@/components/media-rating"

interface DetailLayoutProps {
  params: {
    id: string
  }
  children: React.ReactNode
}

export async function generateMetadata({ params }: DetailLayoutProps) {
  const { title } = await tmdb.movie.detail({
    id: params.id,
  })

  return {
    title,
  }
}

export default async function DetailLayout({
  params,
  children,
}: DetailLayoutProps) {
  const {
    id,
    title,
    overview,
    genres,
    vote_average,
    vote_count,
    backdrop_path,
    poster_path,
    tagline,
    homepage,
  } = await tmdb.movie.detail({
    id: params.id,
  })

  if (!id) return notFound()

  return (
    <MediaDetailView.Root>
      <MediaDetailView.Backdrop>
        <MediaBackdrop image={backdrop_path} alt={title} priority />
      </MediaDetailView.Backdrop>

      <MediaDetailView.Hero>
        <MediaDetailView.Poster>
          <MediaPoster image={poster_path} alt={title} size="w780" priority />
        </MediaDetailView.Poster>

        <div className="space-y-4">
          <MediaDetailView.Genres>
            <MediaRating average={vote_average} count={vote_count} />
            {genres?.map((genre) => (
              <MediaDetailView.Genre key={genre.id}>
                {genre.name}
              </MediaDetailView.Genre>
            ))}
          </MediaDetailView.Genres>

          <MediaDetailView.Title>{title}</MediaDetailView.Title>

          {tagline && (
            <MediaDetailView.Overview>
              &quot;{tagline}&quot;
            </MediaDetailView.Overview>
          )}

          <MediaDetailView.Overview
            dangerouslySetInnerHTML={{ __html: format.content(overview) }}
          />

          <div className="flex gap-2 pt-4">
            <Link
              href={`/movie/${id}/watch`}
              className={buttonVariants()}
              prefetch={false}
            >
              <Play className="mr-2 size-4" /> Watch Now
            </Link>

            {homepage && (
              <Link
                href={homepage}
                className={buttonVariants({ variant: "secondary" })}
                target="_blank"
                prefetch={false}
              >
                <Globe className="mr-2 size-4" /> Website
              </Link>
            )}
          </div>
        </div>
      </MediaDetailView.Hero>

      <MediaDetailView.Content>
        <Tabs className="mt-12 w-full">
          <div className="max-w-screen scrollbar-hidden -mx-8 overflow-x-scroll px-8 lg:m-0 lg:p-0">
            <TabsList>
              <TabsLink href={`/movie/${id}`}>Overview</TabsLink>
              <TabsLink href={`/movie/${id}/credits`}>Credits</TabsLink>
              <TabsLink href={`/movie/${id}/watch`}>Watch</TabsLink>
              <TabsLink href={`/movie/${id}/reviews`}>Reviews</TabsLink>
              <TabsLink href={`/movie/${id}/images`}>Images</TabsLink>
              <TabsLink href={`/movie/${id}/videos`}>Videos</TabsLink>
              <TabsLink href={`/movie/${id}/recommendations`}>
                Recommendations
              </TabsLink>
              <TabsLink href={`/movie/${id}/similar`}>Similar</TabsLink>
            </TabsList>
          </div>
        </Tabs>

        <div className="mt-4">{children}</div>
      </MediaDetailView.Content>
    </MediaDetailView.Root>
  )
}
