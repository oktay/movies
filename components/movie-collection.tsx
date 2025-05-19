import Link from "next/link"
import { tmdb } from "@/tmdb/api"

import { Button } from "@/components/ui/button"
import { MediaBackdrop } from "@/components/media-backdrop"

interface MovieCollectionProps {
  id: number
}

export const MovieCollection: React.FC<MovieCollectionProps> = async ({
  id,
}) => {
  const collection = await tmdb.collection.details({
    id,
  })

  return (
    <div className="h-hero relative w-full">
      <MediaBackdrop image={collection.backdrop_path} alt={collection.name} />
      <div className="overlay">
        <div className="p-4 md:p-10">
          <p className="line-clamp-3 text-xs text-muted-foreground md:text-lg">
            Part of
          </p>
          <h2 className="line-clamp-1 text-lg font-medium md:text-2xl">
            {collection.name}
          </h2>
          <p className="mb-4 line-clamp-1 max-w-2xl text-muted-foreground">
            Includes: {collection.parts.map((part) => part.title).join(", ")}
          </p>
          <Button asChild>
            <Link href={`/collection/${id}`}>View the collection</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
