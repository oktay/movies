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

export default async function DetailVideos({ params }: VideosProps) {
  return <VideoList type="tv" id={params.id} />
}
