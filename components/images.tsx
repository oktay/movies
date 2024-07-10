import Image from "next/image"
import { tmdb } from "@/tmdb/api"
import { tmdbImage } from "@/tmdb/utils"

import { cn } from "@/lib/utils"

interface ImagesProps {
  id: string
  type: "movie" | "tv"
}

export const Images: React.FC<ImagesProps> = async ({ id, type }) => {
  const { posters, backdrops } = await tmdb[type].images({ id, langs: "en" })

  if (!posters.length && !backdrops.length)
    return <div className="empty-box">No images</div>

  const images = [...posters, ...backdrops].sort(
    (a: any, b: any) => a.vote_average - b.vote_average
  )

  return (
    <div className="grid-list items-center gap-4">
      {images.map(({ file_path, aspect_ratio }) => (
        <a
          href={tmdbImage.url(file_path)}
          key={file_path}
          className={cn(
            aspect_ratio > 1
              ? "col-span-2 aspect-video lg:col-span-3 xl:col-span-2"
              : "aspect-poster",
            "relative block transition hover:-translate-y-2"
          )}
          target="_blank"
          rel="noreferrer"
        >
          <Image
            src={tmdbImage.url(file_path, "w780")}
            alt={file_path}
            className="size-full rounded-md border"
            unoptimized
            fill
          />
        </a>
      ))}
    </div>
  )
}
