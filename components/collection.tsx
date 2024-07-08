import { tmdb } from "@/tmdb/api"

import { BackdropImage } from "./backdrop-image"
import { CollectionDialog } from "./collection-dialog"

export const Collection = async ({ id }: { id: number }) => {
  const collection = await tmdb.collection.details({
    id,
  })

  return (
    <div className="card-border h-hero relative mt-4 w-full">
      <BackdropImage image={collection.backdrop_path} alt={collection.name} />
      <div className="overlay">
        <div className="p-4 md:p-10">
          <p className="line-clamp-3 text-xs text-muted-foreground md:text-lg">
            Part of
          </p>
          <h2 className="line-clamp-1 text-lg font-medium md:text-2xl">
            {collection.name}
          </h2>
          <CollectionDialog collection={collection} />
        </div>
      </div>
    </div>
  )
}
