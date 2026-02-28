import { tmdb } from "@/tmdb/api"

import { sortByReleaseDate } from "@/lib/utils"
import { MovieCollectionPart } from "@/components/movie/movie-collection-part"

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
      <div className="grid gap-4 lg:grid-cols-2">
        {sortByReleaseDate(parts).map((part) => (
          <MovieCollectionPart {...part} />
        ))}
      </div>
    </section>
  )
}
