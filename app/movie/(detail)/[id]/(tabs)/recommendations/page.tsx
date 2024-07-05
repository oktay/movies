import Link from "next/link"
import { tmdb } from "@/tmdb/api"

import { MediaCard } from "@/components/media-card"
import { PosterImage } from "@/components/poster-image"

export default async function DetailRecommendations({
  params,
}: {
  params: { id: string }
}) {
  const { results } = await tmdb.movie.recommendations({
    id: params.id,
  })

  if (!results.length) {
    return <div className="empty-box">No recommendations</div>
  }

  return (
    <div className="grid-list">
      {results.map((movie) => (
        <Link href={`/movie/${movie.id}`} key={movie.id}>
          <MediaCard.Root>
            <PosterImage
              image={movie.poster_path}
              size="w500"
              alt={movie.title}
            />
            <MediaCard.Content>
              <MediaCard.Title>{movie.title}</MediaCard.Title>
              <MediaCard.Excerpt>{movie.overview}</MediaCard.Excerpt>
            </MediaCard.Content>
          </MediaCard.Root>
        </Link>
      ))}
    </div>
  )
}
