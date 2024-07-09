import { tmdb } from "@/tmdb/api"

import { VideoList } from "@/components/video-list"

interface VideosProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: VideosProps) {
  const { name } = await tmdb.tv.detail({
    id: params.id,
  })

  return {
    title: `Videos - ${name}`,
  }
}

export default async function Videos({ params }: VideosProps) {
  const { results } = await tmdb.tv.videos({ id: params.id })

  if (!results?.length) return <div className="empty-box">No videos</div>

  return <VideoList videos={results} />
}
