import Link from "next/link"
import { tmdb } from "@/tmdb/api"

import { MediaCard } from "@/components/media-card"
import { Poster } from "@/components/poster"

interface DetailSimilarProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: DetailSimilarProps) {
  const { title } = await tmdb.movie.detail({
    id: params.id,
  })

  return {
    title: `Similar - ${title}`,
  }
}

export default async function DetailSimilar({ params }: DetailSimilarProps) {
  const { results } = await tmdb.movie.similar({
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
            <Poster image={movie.poster_path} size="w500" alt={movie.title} />
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
