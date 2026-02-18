"use client"

import { Review } from "@/tmdb/models"
import { format } from "@/tmdb/utils"
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { useExpandableContent } from "@/hooks/useExpandableContent"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { MediaRating } from "@/components/media/media-rating"
import { UserAvatar } from "@/components/user/user-avatar"

interface UserReviewCardProps {
  review: Review
}

export const UserReviewCard: React.FC<UserReviewCardProps> = ({ review }) => {
  const { author_details, author, created_at, content } = review
  const { name, avatar_path, username, rating } = author_details
  const { ref, expandable, expanded, toggleExpanded } = useExpandableContent()

  return (
    <div className="grid grid-cols-[auto,1fr] items-center gap-2 md:items-start md:gap-x-4">
      <div className="w-10 md:row-span-2 md:w-12">
        <div className="relative aspect-square">
          <UserAvatar image={avatar_path} alt={name} className="border" />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <h3 className="flex flex-wrap items-center gap-2">
          <span className="block text-sm md:text-base">{author}</span>
          <span className="block text-xs text-muted-foreground md:text-sm">
            @{username}
          </span>
        </h3>
        <div className="flex flex-col items-end gap-2 md:flex-row md:items-center">
          <span className="text-right text-xs text-muted-foreground">
            {format.date(created_at)}
          </span>
          <MediaRating average={rating} />
        </div>
      </div>
      <div className="col-span-2 space-y-2 rounded-md border p-4 md:col-span-1 md:col-start-2">
        <div
          className={cn(
            "scroll-m-36 text-sm leading-relaxed",
            !expanded && "line-clamp-3"
          )}
          dangerouslySetInnerHTML={{
            __html: format.content(content),
          }}
          ref={ref}
        />
        {expandable && (
          <Button
            size="icon"
            variant="link"
            className="mt-2 w-full"
            onClick={toggleExpanded}
          >
            <span className="sr-only">
              {expanded ? "Show Less" : "Read More"}
            </span>
            {expanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </Button>
        )}
      </div>
    </div>
  )
}

export const SkeletonReviewCard = () => (
  <div className="grid grid-cols-[auto,1fr] items-center gap-2 md:items-start md:gap-x-4">
    <div className="relative aspect-square w-10 md:row-span-2 md:w-12">
      <Skeleton className="size-full rounded-full" />
    </div>
    <div className="flex items-center justify-between">
      <h3 className="flex">
        <Skeleton className="h-6 w-40 rounded-md" />
      </h3>
      <div className="flex flex-col items-end gap-2 md:flex-row md:items-center">
        <Skeleton className="h-4 w-24 rounded-md" />
        <Skeleton className="h-4 w-24 rounded-md" />
      </div>
    </div>
    <div className="col-span-2 space-y-2 rounded-md border p-4 text-sm leading-relaxed md:col-span-1 md:col-start-2">
      <Skeleton className="h-4 w-full rounded-md" />
      <Skeleton className="h-4 w-full rounded-md" />
      <Skeleton className="h-4 w-full rounded-md" />
    </div>
  </div>
)
