import { ComponentProps } from "react"
import Image from "next/image"
import { PosterSize, tmdbImage } from "@/tmdb/utils"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

type PosterImageProps = ComponentProps<"div"> & {
  image?: string
  size?: PosterSize
  alt: string
  priority?: boolean
}

export const PosterImage: React.FC<PosterImageProps> = ({
  image,
  size,
  alt,
  className,
  priority,
  ...props
}) => {
  const src = image ? tmdbImage.poster(image, size) : null

  if (!src) {
    return (
      <div
        className={cn("size-full bg-muted text-muted-foreground", className)}
        {...props}
      >
        <div className="grid size-full place-items-center">
          <Icons.Logo className="size-12" />
        </div>
      </div>
    )
  }

  return (
    <Image
      className={cn("size-full bg-muted object-cover", className)}
      src={src}
      alt={alt}
      priority={priority}
      unoptimized
      fill
    />
  )
}
