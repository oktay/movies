import { tmdb } from "@/tmdb/api"

import { Videos } from "@/components/videos"

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

export default async function DetailVideos({ params }: VideosProps) {
  const { results: videos } = await tmdb.tv.videos({ id: params.id })

  if (!videos?.length) return <div className="empty-box">No videos</div>
  return <Videos videos={videos} />
}
