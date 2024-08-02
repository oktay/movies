import { User } from "lucide-react"

import { cn } from "@/lib/utils"

import { Badge, BadgeProps } from "./ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip"

interface MediaRatingProps extends BadgeProps {
  average: number
  count?: number
}

export const MediaRating: React.FC<MediaRatingProps> = ({
  average,
  count,
  className,
  ...props
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Badge
            className={cn("flex items-center gap-1", className)}
            {...props}
          >
            {average ? average.toFixed(1) : "N/A"}
          </Badge>
        </TooltipTrigger>

        {!!count && (
          <TooltipContent className="flex items-center gap-1 bg-foreground text-xs text-background">
            <User className="size-3" /> {count}
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  )
}
