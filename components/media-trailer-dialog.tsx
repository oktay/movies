import { Video } from "@/tmdb/models"
import { yt } from "@/tmdb/utils"
import { Play } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

interface MediaTrailerDialogProps {
  videos: Video[]
}

export const MediaTrailerDialog: React.FC<MediaTrailerDialogProps> = ({
  videos,
}) => {
  const trailer = videos?.find((video) => video.type === "Trailer")

  return (
    <Dialog modal>
      <DialogTrigger className={cn(buttonVariants())} disabled={!trailer}>
        <Play className="mr-2 size-4" /> Watch Trailer
      </DialogTrigger>

      {trailer && (
        <DialogContent className="max-w-screen-lg">
          <iframe
            className="aspect-square size-full rounded-md sm:aspect-video"
            src={yt.video(trailer.key, true)}
            allow="autoplay; encrypted-media"
            allowFullScreen={true}
          />
        </DialogContent>
      )}
    </Dialog>
  )
}
