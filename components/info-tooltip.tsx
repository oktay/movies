import { TooltipContentProps } from "@radix-ui/react-tooltip"
import { Info } from "lucide-react"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export const InfoTooltip: React.FC<TooltipContentProps> = ({ ...props }) => (
  <TooltipProvider delayDuration={100}>
    <Tooltip>
      <TooltipTrigger>
        <Info className="size-4" />
      </TooltipTrigger>
      <TooltipContent {...props} />
    </Tooltip>
  </TooltipProvider>
)
