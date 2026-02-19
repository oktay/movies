import { tmdb } from "@/tmdb/api"

import { sortByReleaseDate } from "@/lib/utils"
import { MediaPreview } from "@/components/media/media-preview"

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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sortByReleaseDate(parts).map((part) => (
          <MediaPreview {...part} />
        ))}
      </div>
    </section>
  )
}
