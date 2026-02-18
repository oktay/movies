import { tmdb } from "@/tmdb/api"

import { MediaVideos } from "@/components/media/media-videos"

interface DetailVideosProps {
  params: {
    id: string
  }
}

export const metadata = {
  title: "Videos",
}

export default async function DetailVideos({ params }: DetailVideosProps) {
  const { results: videos } = await tmdb.movie.videos({
    id: params.id,
  })

  return <MediaVideos videos={videos} />
}
