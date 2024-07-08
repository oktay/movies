import Link from "next/link"
import { notFound } from "next/navigation"
import { tmdb } from "@/tmdb/api"
import { PlayCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { BackdropImage } from "@/components/backdrop-image"
import { DetailTabs } from "@/components/detail-tabs"
import { DetailView } from "@/components/detail-view"
import { PosterImage } from "@/components/poster-image"

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
          <DetailView.Overview>{overview}</DetailView.Overview>
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
        <div className="mt-12">
          <DetailTabs id={params.id} type="movie" />
          <div className="mt-2">{children}</div>
        </div>
      </DetailView.Content>
    </DetailView.Root>
  )
}
