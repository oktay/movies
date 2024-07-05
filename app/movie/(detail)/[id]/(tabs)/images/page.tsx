import { tmdb } from "@/tmdb/api"

import { ImageList } from "@/components/image-list"

export default async function DetailImages({
  params,
}: {
  params: { id: string }
}) {
  const { backdrops, posters } = await tmdb.movie.images({
    id: params.id,
    langs: "en",
  })

  return (
    <div className="space-y-4">
      <ImageList images={backdrops} type="backdrop" title="Backdrops" />
      <ImageList images={posters} type="poster" title="Posters" />
    </div>
  )
}
