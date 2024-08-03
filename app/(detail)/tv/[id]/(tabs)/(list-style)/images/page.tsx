import { tmdb } from "@/tmdb/api"

import { MediaImages } from "@/components/media-images"

interface DetailImagesProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: DetailImagesProps) {
  const { name } = await tmdb.tv.detail({
    id: params.id,
  })

  return {
    title: `Images - ${name}`,
  }
}

export default async function DetailImages({ params }: DetailImagesProps) {
  const { posters, backdrops } = await tmdb.tv.images({
    id: params.id,
    langs: "en",
  })
  return <MediaImages posters={posters} backdrops={backdrops} />
}
