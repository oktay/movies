import { ComponentProps } from "react"
import Image from "next/image"
import { tmdbImage } from "@/tmdb/utils"

import { cn } from "@/lib/utils"

import { Icons } from "./icons"

type BackdropProps = ComponentProps<"div"> & {
  image?: string
  size?: "w500" | "original"
  alt: string
  priority?: boolean
}

export const BackdropImage: React.FC<BackdropProps> = ({
  image,
  size,
  alt,
  className,
  priority,
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
          <Icons.Logo className="size-12" />
        </div>
      </div>
    )
  }

  return (
    <Image
      className={cn("size-full object-cover", className)}
      src={src}
      alt={alt}
      priority={priority}
      unoptimized
      fill
    />
  )
}
