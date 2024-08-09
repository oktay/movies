"use client"

import { useFilters } from "@/hooks"
import { WatchProvider } from "@/tmdb/models"
import { Genre } from "@/tmdb/models/commons"
import { SlidersHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { DiscoverFilterDate } from "@/components/discover-filter-date"
import { DiscoverFilterGenre } from "@/components/discover-filter-genre"
import { DiscoverFilterLang } from "@/components/discover-filter-lang"
import { DiscoverFilterProvider } from "@/components/discover-filter-provider"
import { DiscoverFilterVoteAverage } from "@/components/discover-filter-vote-average"
import { DiscoverFilterVoteCount } from "@/components/discover-filter-vote-count"

interface DiscoverFiltersProps {
  type: "movie" | "tv"
  genres: Genre[]
  providers: WatchProvider[]
}

export const DiscoverFilters: React.FC<DiscoverFiltersProps> = ({
  type,
  genres,
  providers,
}) => {
  const { count, getFilter, setFilter, saveFilters, clearFilters } =
    useFilters(type)

  return (
    <Sheet>
      <SheetTrigger className={cn(buttonVariants({ variant: "outline" }))}>
        <SlidersHorizontal className="mr-2 size-4" /> Filters
        {count > 0 && (
          <Badge className="ml-2 px-2 text-xs leading-none">{count}</Badge>
        )}
      </SheetTrigger>

      <SheetContent className="flex flex-col px-0">
        <SheetHeader className="px-4 md:px-6">
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>
            Narrow down your search results with the following filters.
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="px-4 md:px-6">
          <div className="space-y-8">
            <DiscoverFilterGenre
              genres={genres}
              value={getFilter("with_genres")}
              onChange={(value) => setFilter({ with_genres: value })}
            />

            <div className="grid gap-2 md:grid-cols-2">
              <DiscoverFilterDate
                label="From"
                align="start"
                value={getFilter("primary_release_date.gte")}
                disableAfter={getFilter("primary_release_date.lte")}
                onChange={(value) =>
                  setFilter({ "primary_release_date.gte": value })
                }
              />

              <DiscoverFilterDate
                label="To"
                align="end"
                value={getFilter("primary_release_date.lte")}
                disableBefore={getFilter("primary_release_date.gte")}
                onChange={(value) =>
                  setFilter({ "primary_release_date.lte": value })
                }
              />
            </div>

            <DiscoverFilterLang
              value={getFilter("with_original_language")}
              onChange={(value) => setFilter({ with_original_language: value })}
            />

            <DiscoverFilterProvider
              providers={providers}
              value={getFilter("with_watch_providers")}
              onChange={(value) => setFilter({ with_watch_providers: value })}
            />

            <DiscoverFilterVoteAverage
              value={getFilter("vote_average.gte")}
              onChange={(value) => setFilter({ "vote_average.gte": value })}
            />

            <DiscoverFilterVoteCount
              value={getFilter("vote_count.gte")}
              onChange={(value) => setFilter({ "vote_count.gte": value })}
            />
          </div>
        </ScrollArea>

        <SheetFooter className="gap-2 px-4 md:gap-0 md:px-6">
          <Button size="lg" variant="outline" onClick={clearFilters}>
            Clear
          </Button>
          <SheetClose className={buttonVariants()} onClick={saveFilters}>
            Save Changes
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
