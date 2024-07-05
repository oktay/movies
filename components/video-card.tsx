import { ComponentProps } from "react"
import Image, { ImageProps } from "next/image"

import { cn } from "@/lib/utils"

const Root: React.FC<ComponentProps<"div">> = ({ className, ...props }) => {
  return (
    <div
      className={cn("card-border relative aspect-video", className)}
      {...props}
    />
  )
}

const Thumbnail: React.FC<ImageProps> = ({
  className,
  unoptimized = true,
  fill = true,
  alt,
  ...props
}) => {
  return (
    <Image
      className={cn("size-full object-cover", className)}
      alt={alt}
      unoptimized={true}
      fill={fill}
      {...props}
    />
  )
}

const Content: React.FC<ComponentProps<"div">> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn("overlay", className)} {...props}>
      <div className="p-6">{children}</div>
    </div>
  )
}

export const VideoCard = {
  Root,
  Thumbnail,
  Content,
}
