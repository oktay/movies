import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DiscoverFilterDateProps {
  value: string
  disableBefore?: string
  disableAfter?: string
  align: "start" | "end" | "center"
  label: string
  onChange: (value: string) => void
}

export const DiscoverFilterDate: React.FC<DiscoverFilterDateProps> = ({
  value,
  align,
  label,
  disableBefore,
  disableAfter,
  onChange,
}) => {
  const selected = value ? new Date(value) : undefined
  const from = disableBefore ? new Date(disableBefore) : new Date("01/01/1900")
  const to = disableAfter ? new Date(disableAfter) : new Date("12/31/2050")
  const disabled = {
    after: disableAfter ? new Date(disableAfter) : new Date("12/31/2050"),
    before: disableBefore ? new Date(disableBefore) : new Date("01/01/1900"),
  }

  const setSelectedDate = (date?: Date) => {
    onChange(date ? format(date, "yyyy/MM/dd") : "")
  }

  return (
    <div className="space-y-2">
      <Label className="flex text-muted-foreground">{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 size-4" />
            {value ? format(value, "PP") : <span>Select date...</span>}
          </Button>
        </PopoverTrigger>

        <PopoverContent align={align} className="w-64 p-0 md:w-auto">
          <Calendar
            mode="single"
            captionLayout="dropdown"
            selected={selected}
            fromDate={from}
            toDate={to}
            disabled={disabled}
            onSelect={setSelectedDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
