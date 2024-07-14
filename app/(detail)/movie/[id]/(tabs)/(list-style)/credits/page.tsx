import { tmdb } from "@/tmdb/api"

import { MediaCastCard } from "@/components/media-cast-card"

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
      {cast.map((cast) => (
        <MediaCastCard key={cast.credit_id} {...cast} />
      ))}
    </section>
  )
}
