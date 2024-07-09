import { Review } from "@/tmdb/models"
import { format } from "@/tmdb/utils"

import { Badge } from "@/components/ui/badge"
import { Avatar } from "@/components/avatar"

interface ReviewCardProps {
  review: Review
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const { author_details, author, created_at, content } = review
  const { name, avatar_path, username, rating } = author_details

  return (
    <div className="grid grid-cols-[auto,1fr] gap-2 md:gap-x-4">
      <div className="relative aspect-square w-10 md:w-12">
        <Avatar image={avatar_path} alt={name} className="border" />
      </div>
      <div className="flex items-center justify-between">
        <h3>
          <span className="block text-sm md:text-base">{author}</span>
          <span className="block text-xs text-muted-foreground md:text-sm">
            @{username}
          </span>
        </h3>
        <div className="flex flex-col items-end gap-2 md:flex-row md:items-center">
          <span className="text-xs text-muted-foreground">
            {format.date(created_at)}
          </span>
          <Badge>{rating?.toFixed(1) ?? "Not rated"}</Badge>
        </div>
      </div>
      <div
        className="col-span-2 space-y-2 rounded-md border p-4 text-sm leading-relaxed md:col-span-1 md:col-start-2"
        dangerouslySetInnerHTML={{
          __html: format.content(content),
        }}
      />
    </div>
  )
}
