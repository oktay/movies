import { ComponentProps } from "react"
import { Image } from "@/tmdb/models"
import { tmdbImage } from "@/tmdb/utils"

import { cn, pluralize } from "@/lib/utils"
import { BackdropImage } from "@/components/backdrop-image"
import { PosterImage } from "@/components/poster-image"

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
          {count} {pluralize(count, "Image", "Images")}
        </span>
      </h2>
      {count ? (
        <div className="grid-list">
          {images.map((image, index) => (
            <a
              href={tmdbImage.url(image.file_path)}
              target="_blank"
              key={image.file_path}
              className={cn("relative", aspect)}
              rel="noreferrer"
            >
              <ImageComponent
                image={image.file_path}
                alt={`${type} ${index + 1}`}
                size="w780"
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
