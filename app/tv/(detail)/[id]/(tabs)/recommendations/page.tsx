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
  const { name } = await tmdb.tv.detail({
    id: params.id,
  })

  return {
    title: `Recommendations - ${name}`,
  }
}

export default async function DetailRecommendations({
  params,
}: DetailRecommendationsProps) {
  const { results } = await tmdb.tv.recommendations({
    id: params.id,
  })

  if (!results?.length) {
    return <div className="empty-box">No recommendations</div>
  }

  return (
    <ul className="grid-list">
      {results.map((tv) => (
        <Link href={`/tv/${tv.id}`} key={tv.id}>
          <MediaCard.Root>
            <PosterImage image={tv.poster_path} size="w500" alt={tv.name} />
            <MediaCard.Content>
              <MediaCard.Title>{tv.name}</MediaCard.Title>
              <MediaCard.Excerpt>{tv.overview}</MediaCard.Excerpt>
            </MediaCard.Content>
          </MediaCard.Root>
        </Link>
      ))}
    </ul>
  )
}
