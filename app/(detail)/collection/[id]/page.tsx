import Link from "next/link"
import { pages } from "@/config"
import { tmdb } from "@/tmdb/api"

import { sortByReleaseDate } from "@/lib/utils"
import { MediaBackdrop } from "@/components/media-backdrop"
import { MediaMiniDetail } from "@/components/media-mini-detail"
import { MediaPoster } from "@/components/media-poster"

interface DetailProps {
  params: {
    id: string
  }
}

export default async function Detail({ params }: DetailProps) {
  const { parts } = await tmdb.collection.details({
    id: params.id,
  })

  return (
    <section className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        {sortByReleaseDate(parts).map((part) => (
          <Link href={`${pages.movie.root.link}/${part.id}`} key={part.id}>
            <MediaMiniDetail.Root>
              <MediaMiniDetail.Backdrop>
                <MediaBackdrop
                  image={part.backdrop_path}
                  alt={part.title}
                  className="rounded-b-none"
                  size="w780"
                />
              </MediaMiniDetail.Backdrop>

              <MediaMiniDetail.Hero>
                <MediaMiniDetail.Poster>
                  <MediaPoster image={part.poster_path} alt={part.title} />
                </MediaMiniDetail.Poster>

                <div className="space-y-1">
                  <MediaMiniDetail.Title className="line-clamp-1">
                    {part.title}
                  </MediaMiniDetail.Title>
                  <MediaMiniDetail.Overview>
                    {part.overview}
                  </MediaMiniDetail.Overview>
                </div>
              </MediaMiniDetail.Hero>
            </MediaMiniDetail.Root>
          </Link>
        ))}
      </div>
    </section>
  )
}
