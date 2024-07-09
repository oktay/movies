import { tmdb } from "@/tmdb/api"

import { ImageList } from "@/components/image-list"

interface DetailImagesProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: DetailImagesProps) {
  const { title } = await tmdb.movie.detail({
    id: params.id,
  })

  return {
    title: `Images - ${title}`,
  }
}

export default async function DetailImages({ params }: DetailImagesProps) {
  const { backdrops, posters } = await tmdb.movie.images({
    id: params.id,
    langs: "en",
  })

  return (
    <section className="space-y-4">
      <ImageList images={backdrops} type="backdrop" title="Backdrops" />
      <ImageList images={posters} type="poster" title="Posters" />
    </section>
  )
}
