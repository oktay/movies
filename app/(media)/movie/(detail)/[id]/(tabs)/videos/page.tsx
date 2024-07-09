import { tmdb } from "@/tmdb/api"

import { VideoList } from "@/components/video-list"

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

export default async function Videos({ params }: DetailVideosProps) {
  const { results } = await tmdb.movie.videos({ id: params.id })

  if (!results?.length) return <div className="empty-box">No videos</div>
  return <VideoList videos={results} />
}
