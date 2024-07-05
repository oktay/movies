import { tmdb } from "@/tmdb/api"
import { PlayCircle } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BackdropImage } from "@/components/backdrop-image"
import { DetailTabs } from "@/components/detail-tabs"
import { DetailView } from "@/components/detail-view"
import { PosterImage } from "@/components/poster-image"

export default async function DetailLayout({
  params,
  children,
}: {
  children: React.ReactNode
  params: {
    id: string
  }
}) {
  const {
    id,
    name,
    overview,
    backdrop_path,
    poster_path,
    genres,
    vote_average,
  } = await tmdb.tv.detail({
    id: params.id,
  })

  return (
    <DetailView.Root>
      <DetailView.Backdrop>
        <BackdropImage image={backdrop_path} alt={name} />
      </DetailView.Backdrop>

      <DetailView.Hero>
        <DetailView.Poster>
          <PosterImage image={poster_path} alt={name} />
        </DetailView.Poster>

        <div>
          <DetailView.Genres>
            <Badge>{vote_average.toFixed(1)}</Badge>
            {genres.map((genre) => (
              <DetailView.Genre key={genre.id}>{genre.name}</DetailView.Genre>
            ))}
          </DetailView.Genres>

          <DetailView.Title>{name}</DetailView.Title>
          <DetailView.Overview>{overview}</DetailView.Overview>
          <Button className="mt-6">
            <PlayCircle className="mr-2 size-4" /> Watch Trailer
          </Button>
        </div>
      </DetailView.Hero>

      <DetailView.Content>
        <div className="mt-12">
          <DetailTabs id={params.id} type="tv" />
          <div className="mt-2">{children}</div>
        </div>
      </DetailView.Content>
    </DetailView.Root>
  )
}
