import Image from "next/image"
import { Image as TmdbImage } from "@/tmdb/models"
import { tmdbImage } from "@/tmdb/utils"
import { Expand } from "lucide-react"

import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

interface MediaImagesProps {
  posters?: TmdbImage[]
  backdrops?: TmdbImage[]
  profiles?: TmdbImage[]
  logos?: TmdbImage[]
}

export const MediaImages: React.FC<MediaImagesProps> = ({
  posters,
  backdrops,
  profiles,
  logos,
}) => {
  const images = [
    ...(posters ?? []),
    ...(backdrops ?? []),
    ...(profiles ?? []),
    ...(logos ?? []),
  ]

  if (!images.length) return <div className="empty-box">No images</div>

  return (
    <div className="grid-list items-center gap-4">
      {images.map(({ file_path, aspect_ratio }) => (
        <Dialog key={file_path}>
          <DialogTrigger>
            <div
              key={file_path}
              className={cn(
                aspect_ratio > 1
                  ? "col-span-2 aspect-video lg:col-span-3 xl:col-span-2"
                  : "aspect-poster",
                "group relative block transition"
              )}
            >
              <Image
                src={tmdbImage.url(file_path, "w780")}
                alt={file_path}
                className="size-full rounded-md border"
                unoptimized
                fill
              />

              <div className="overlay grid place-items-center opacity-0 transition group-hover:opacity-100">
                <Expand />
              </div>
            </div>
          </DialogTrigger>

          <DialogContent className={cn(aspect_ratio > 1 && "max-w-screen-xl")}>
            <div
              className={cn(
                aspect_ratio > 1 ? "aspect-video" : "aspect-poster"
              )}
            >
              <Image
                src={tmdbImage.url(file_path, "original")}
                alt={file_path}
                className="rounded-md border bg-muted"
                unoptimized
                fill
              />
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  )
}
