import { User } from "lucide-react"

import { cn } from "@/lib/utils"

import { Badge, BadgeProps } from "./ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip"

interface RatingProps extends BadgeProps {
  average: number
  count?: number
}

export const Rating: React.FC<RatingProps> = ({
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
            {average ? average.toFixed(1) : "Not rated"}
          </Badge>
        </TooltipTrigger>
        <TooltipContent className="flex items-center gap-1 bg-foreground text-background">
          <User className="size-3" /> {count || "-"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
