"use client"

import { useSort } from "@/hooks"
import { ArrowDownWideNarrow, ChevronDown, ChevronUp } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DiscoverSortProps {
  type: "movie" | "tv"
}

export const DiscoverSort: React.FC<DiscoverSortProps> = ({ type }) => {
  const { options, getSort, setSort } = useSort(type)

  return (
    <Popover>
      <PopoverTrigger className={buttonVariants({ variant: "outline" })}>
        <ArrowDownWideNarrow className="mr-2 size-4" /> Sort by
      </PopoverTrigger>

      <PopoverContent align="end" className="flex flex-col gap-1 p-1">
        {options.map((option) => (
          <Button
            key={option.value}
            variant={getSort() === option.value ? "default" : "ghost"}
            onClick={() => setSort(option.value)}
            className="justify-between text-left font-normal"
          >
            <span className="flex items-center">
              <option.icon className="mr-2 size-4" /> {option.label}
            </span>

            {option.value.includes("asc") ? (
              <ChevronUp className="size-4" />
            ) : (
              <ChevronDown className="size-4" />
            )}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  )
}
