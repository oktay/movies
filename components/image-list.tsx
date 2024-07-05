import { ComponentProps } from "react"
import { Image } from "@/tmdb/models"
import { tmdbImage } from "@/tmdb/utils"

import { cn } from "@/lib/utils"

import { BackdropImage } from "./backdrop-image"
import { PosterImage } from "./poster-image"

type ImageListProps = {
  images: Image[]
  type: "backdrop" | "poster"
} & ComponentProps<"div">

const ImageList: React.FC<ImageListProps> = ({ images, type }) => {
  const ImageComponent = type === "backdrop" ? BackdropImage : PosterImage
  const title = type === "backdrop" ? "Backdrops" : "Posters"
  const aspect = type === "backdrop" ? "aspect-video" : "aspect-poster"
  const count = images.length

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">
        <span>{title}</span>
        <span className="ml-1 align-middle text-xs text-muted-foreground">
          {count} Image{count > 1 ? "s" : ""}
        </span>
      </h2>
      {count ? (
        <div className="grid-list">
          {images.map((image, index) => (
            <a
              href={tmdbImage(image.file_path)}
              target="_blank"
              key={image.file_path}
              className={cn("relative", aspect)}
              rel="noreferrer"
            >
              <ImageComponent
                image={image.file_path}
                alt={`${type} ${index + 1}`}
                size="w500"
                className="rounded-md"
              />
            </a>
          ))}
        </div>
      ) : (
        <div className="empty-box">No {title}</div>
      )}
    </div>
  )
}

export { ImageList }
