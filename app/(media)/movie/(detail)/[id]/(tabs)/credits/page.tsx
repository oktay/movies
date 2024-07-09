import Link from "next/link"
import { tmdb } from "@/tmdb/api"

import { MediaCard } from "@/components/media-card"
import { Poster } from "@/components/poster"

interface DetailCreditsProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: DetailCreditsProps) {
  const { title } = await tmdb.movie.detail({
    id: params.id,
  })

  return {
    title: `Credits - ${title}`,
  }
}

export default async function DetailCredits({ params }: DetailCreditsProps) {
  const { cast } = await tmdb.movie.credits({ id: params.id })

  if (!cast?.length) {
    return <div className="empty-box">No credits</div>
  }

  return (
    <section className="grid-list">
      {cast.map(({ id, name, character, profile_path }) => (
        <Link href={`/person/${id}`} key={id} prefetch={false}>
          <MediaCard.Root>
            <Poster image={profile_path} size="w500" alt={name} />
            <MediaCard.Content>
              <MediaCard.Title>{name}</MediaCard.Title>
              <MediaCard.Excerpt>{character}</MediaCard.Excerpt>
            </MediaCard.Content>
          </MediaCard.Root>
        </Link>
      ))}
    </section>
  )
}
