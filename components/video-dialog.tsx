import { yt } from "@/tmdb/utils"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export const VideoDialog = ({
  video,
  title,
  children,
}: {
  video: string
  title: string
  children: React.ReactNode
}) => {
  return (
    <Dialog modal>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="aspect-video max-w-screen-xl">
        <div>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>

          <div className="h-full flex-1">
            <iframe
              className="size-full"
              src={yt.video(video, true)}
              allow="autoplay; encrypted-media"
              allowFullScreen={true}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
