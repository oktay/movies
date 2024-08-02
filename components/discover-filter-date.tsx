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
  fromDate?: string
  toDate?: string
  align: "start" | "end" | "center"
  label: string
  onChange: (value: string) => void
}

export const DiscoverFilterDate: React.FC<DiscoverFilterDateProps> = ({
  value,
  fromDate,
  toDate,
  align,
  label,
  onChange,
}) => {
  const dates = {
    from: fromDate ? new Date(fromDate) : undefined,
    to: toDate ? new Date(toDate) : undefined,
    value: value ? new Date(value) : undefined,
    format: "yyyy/MM/dd",
  }

  const setSelectedDate = (date?: Date) => {
    onChange(date ? format(date, dates.format) : "")
  }

  return (
    <div className="space-y-2">
      <Label className="text-muted-foreground">{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !dates.value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 size-4" />
            {dates.value ? (
              format(dates.value, dates.format)
            ) : (
              <span>Select date...</span>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent align={align} className="w-auto p-0">
          <Calendar
            mode="single"
            selected={dates.value}
            fromDate={dates.from}
            toDate={dates.to}
            onSelect={setSelectedDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
