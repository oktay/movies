import { ComponentProps } from "react"
import Image from "next/image"
import { ProfileSize, tmdbImage } from "@/tmdb/utils"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

interface UserAvatarProps extends ComponentProps<"div"> {
  image?: string
  size?: ProfileSize
  alt: string
  priority?: boolean
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  image,
  size = "w45",
  alt,
  className,
  priority,
  ...props
}) => {
  const src = image ? tmdbImage.profile(image, size) : null

  if (!src) {
    return (
      <div
        className={cn(
          "size-full rounded-full bg-muted text-muted-foreground",
          className
        )}
        {...props}
      >
        <div className="grid size-full place-items-center">
          <Icons.Logo className="size-6" />
        </div>
      </div>
    )
  }

  return (
    <Image
      className={cn("size-full rounded-full bg-muted object-cover", className)}
      src={src}
      alt={alt}
      priority={priority}
      unoptimized
      fill
    />
  )
}
