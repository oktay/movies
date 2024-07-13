import { ComponentProps } from "react"
import Image from "next/image"
import { yt } from "@/tmdb/utils"
import { PlayCircle } from "lucide-react"

import { cn } from "@/lib/utils"

interface VideoCardProps extends ComponentProps<"div"> {
  name: string
  ytKey: string
}

export const VideoCard: React.FC<VideoCardProps> = ({
  name,
  ytKey,
  className,
  ...props
}) => (
  <div
    className={cn("relative aspect-video cursor-pointer bg-muted", className)}
    {...props}
  >
    <Image
      className="size-full rounded-md border object-cover"
      src={yt.thumbnail(ytKey)}
      alt={name}
      unoptimized
      fill
    />
    <div className="overlay">
      <div className="p-4 md:p-6">
        <h3 className="line-clamp-2 font-semibold md:text-lg">{name}</h3>
        <PlayCircle className="absolute left-1/2 top-1/2 size-10 -translate-x-1/2 -translate-y-1/2" />
      </div>
    </div>
  </div>
)
