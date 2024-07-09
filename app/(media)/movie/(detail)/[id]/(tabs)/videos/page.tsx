import { tmdb } from "@/tmdb/api"

import { Videos } from "@/components/videos"

interface DetailVideosProps {
  params: {
    id: number
  }
}

export async function generateMetadata({ params }: DetailVideosProps) {
  const { title } = await tmdb.movie.detail({
    id: params.id,
  })

  return {
    title: `Videos - ${title}`,
  }
}

export default async function DetailVideos({ params }: DetailVideosProps) {
  const { results: videos } = await tmdb.movie.videos({ id: params.id })

  if (!videos?.length) return <div className="empty-box">No videos</div>
  return <Videos videos={videos} />
}
