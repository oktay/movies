import React from "react"
import { Video } from "@/tmdb/models"
import { yt } from "@/tmdb/utils"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { MediaVideosCard } from "@/components/media/media-videos-card"

interface MediaVideosProps {
  videos: Video[]
}

export const MediaVideos: React.FC<MediaVideosProps> = async ({ videos }) => {
  if (!videos?.length) return <div className="empty-box">No videos</div>

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {videos.map(({ id, key, name }) => (
        <Dialog key={id} modal>
          <DialogTrigger asChild>
            <MediaVideosCard name={name} ytKey={key} />
          </DialogTrigger>

          <DialogContent className="max-w-screen-lg">
            <DialogHeader>
              <DialogTitle>{name}</DialogTitle>
            </DialogHeader>

            <iframe
              className="aspect-square size-full rounded-md sm:aspect-video"
              src={yt.video(key, true)}
              allow="autoplay; encrypted-media"
              allowFullScreen={true}
            />
          </DialogContent>
        </Dialog>
      ))}
    </div>
  )
}
