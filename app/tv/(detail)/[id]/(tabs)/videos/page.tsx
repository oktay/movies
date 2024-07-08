import { tmdb } from "@/tmdb/api"
import { yt } from "@/tmdb/utils"
import { PlayCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { VideoCard } from "@/components/video-card"
import { VideoDialog } from "@/components/video-dialog"

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

  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {results.map((video) => (
        <VideoCard.Root key={video.id}>
          <VideoCard.Thumbnail src={yt.thumbnail(video.key)} alt={video.name} />
          <VideoCard.Content>
            <h3 className="line-clamp-1 text-lg font-semibold">{video.name}</h3>

            <VideoDialog video={video.key} title={video.name}>
              <div className="absolute inset-0 grid cursor-pointer place-items-center">
                <Button size="icon" variant="ghost">
                  <PlayCircle />
                </Button>
              </div>
            </VideoDialog>
          </VideoCard.Content>
        </VideoCard.Root>
      ))}
    </ul>
  )
}
