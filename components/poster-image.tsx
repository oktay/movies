import { ComponentProps } from "react"
import Image from "next/image"
import { tmdbImage } from "@/tmdb/utils"
import { Popcorn } from "lucide-react"

import { cn } from "@/lib/utils"

type PosterImageProps = ComponentProps<"div"> & {
  image?: string
  size?: "w500" | "original"
  alt: string
}

export const PosterImage: React.FC<PosterImageProps> = ({
  image,
  size = "original",
  alt,
  className,
  ...props
}) => {
  const src = image ? tmdbImage(image, size) : null

  if (!src) {
    return (
      <div
        className={cn("size-full bg-muted text-muted-foreground", className)}
        {...props}
      >
        <div className="grid size-full place-items-center">
          <Popcorn className="size-12" />
        </div>
      </div>
    )
  }

  return (
    <Image
      className={cn("size-full bg-muted object-cover", className)}
      src={src}
      alt={alt}
      unoptimized
      fill
    />
  )
}
