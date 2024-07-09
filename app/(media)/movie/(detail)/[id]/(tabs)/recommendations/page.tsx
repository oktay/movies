import Link from "next/link"
import { tmdb } from "@/tmdb/api"

import { MediaCard } from "@/components/media-card"
import { PosterImage } from "@/components/poster-image"

interface DetailRecommendationsProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: DetailRecommendationsProps) {
  const { title } = await tmdb.movie.detail({
    id: params.id,
  })

  return {
    title: `Recommendations - ${title}`,
  }
}

export default async function DetailRecommendations({
  params,
}: DetailRecommendationsProps) {
  const { results } = await tmdb.movie.recommendations({
    id: params.id,
  })

  if (!results.length) {
    return <div className="empty-box">No recommendations</div>
  }

  return (
    <section className="grid-list">
      {results.map((movie) => (
        <Link key={movie.id} href={`/movie/${movie.id}`}>
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
    </section>
  )
}
