import Link from "next/link"
import { notFound } from "next/navigation"
import { tmdb } from "@/tmdb/api"
import { format } from "@/tmdb/utils"
import { PlayCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Tabs, TabsList } from "@/components/ui/tabs"
import { BackdropImage } from "@/components/backdrop-image"
import { DetailView } from "@/components/detail-view"
import { PosterImage } from "@/components/poster-image"
import { TabsLink } from "@/components/tabs-link"

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
    backdrop_path,
    poster_path,
  } = await tmdb.movie.detail({
    id: params.id,
  })

  if (!id) return notFound()

  return (
    <DetailView.Root>
      <DetailView.Backdrop>
        <BackdropImage image={backdrop_path} alt={title} priority />
      </DetailView.Backdrop>

      <DetailView.Hero>
        <DetailView.Poster>
          <PosterImage image={poster_path} alt={title} priority />
        </DetailView.Poster>

        <div>
          <DetailView.Genres>
            <Badge>{vote_average?.toFixed(1)}</Badge>
            {genres?.map((genre) => (
              <DetailView.Genre key={genre.id}>{genre.name}</DetailView.Genre>
            ))}
          </DetailView.Genres>

          <DetailView.Title>{title}</DetailView.Title>
          <DetailView.Overview
            dangerouslySetInnerHTML={{ __html: format.content(overview) }}
          />
          <Link
            href={`/movie/${params.id}/videos`}
            className={cn(
              buttonVariants({
                variant: "default",
              }),
              "mt-6"
            )}
          >
            <PlayCircle className="mr-2 size-4" /> Watch Videos
          </Link>
        </div>
      </DetailView.Hero>

      <DetailView.Content>
        <Tabs className="mt-12 w-full">
          <div className="max-w-screen scrollbar-hidden -mx-8 overflow-x-scroll px-8 lg:m-0 lg:p-0">
            <TabsList>
              <TabsLink href={`/movie/${id}`}>Overview</TabsLink>
              <TabsLink href={`/movie/${id}/credits`}>Credits</TabsLink>
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
      </DetailView.Content>
    </DetailView.Root>
  )
}
