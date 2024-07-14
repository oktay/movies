import { tmdb } from "@/tmdb/api"

import { MediaCastCard } from "@/components/media-cast-card"

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
      {cast.map((cast) => (
        <MediaCastCard key={cast.credit_id} {...cast} />
      ))}
    </section>
  )
}
