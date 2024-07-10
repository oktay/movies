import { tmdb } from "@/tmdb/api"

import { Images } from "@/components/images"

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
  return <Images id={params.id} type="movie" />
}
