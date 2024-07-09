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
  const { name } = await tmdb.tv.detail({
    id: params.id,
  })

  return {
    title: `Credits - ${name}`,
  }
}

export default async function DetailCredits({
  params,
}: {
  params: { id: string }
}) {
  const { cast } = await tmdb.tv.credits({ id: params.id })

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
