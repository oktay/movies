import { tmdb } from "@/tmdb/api"
import { yt } from "@/tmdb/utils"
import { PlayCircle } from "lucide-react"

import { VideoCard } from "@/components/video-card"
import { VideoDialog } from "@/components/video-dialog"

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
    title: `Credits - ${title}`,
  }
}

export default async function Videos({ params }: DetailVideosProps) {
  const { results } = await tmdb.movie.videos({ id: params.id })

  if (!results?.length) return <div className="empty-box">No videos</div>

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {results.map((video) => (
        <VideoDialog key={video.id} video={video.key} title={video.name}>
          <VideoCard.Root>
            <VideoCard.Thumbnail
              src={yt.thumbnail(video.key)}
              alt={video.name}
            />
            <VideoCard.Content>
              <h3 className="line-clamp-2 font-semibold md:text-lg">
                {video.name}
              </h3>
              <div className="absolute inset-0 grid cursor-pointer place-items-center">
                <PlayCircle className="size-10" />
              </div>
            </VideoCard.Content>
          </VideoCard.Root>
        </VideoDialog>
      ))}
    </div>
  )
}
