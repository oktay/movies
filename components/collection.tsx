import { tmdb } from "@/tmdb/api"

import { Backdrop } from "@/components/backdrop"
import { CollectionDialog } from "@/components/collection-dialog"

interface CollectionProps {
  id: number
}

export const Collection: React.FC<CollectionProps> = async ({ id }) => {
  const collection = await tmdb.collection.details({
    id,
  })

  return (
    <div className="card h-hero relative mt-4 w-full">
      <Backdrop image={collection.backdrop_path} alt={collection.name} />
      <div className="overlay">
        <div className="p-4 md:p-10">
          <p className="line-clamp-3 text-xs text-muted-foreground md:text-lg">
            Part of
          </p>
          <h2 className="line-clamp-1 text-lg font-medium md:text-2xl">
            {collection.name}
          </h2>
          <p className="line-clamp-1 max-w-2xl text-muted-foreground">
            Includes: {collection.parts.map((part) => part.title).join(", ")}
          </p>
          <CollectionDialog collection={collection} />
        </div>
      </div>
    </div>
  )
}
