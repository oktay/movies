"use client"

import { useRouter } from "next/navigation"
import { pages } from "@/config"
import { Season } from "@/tmdb/models"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"

interface TvSeasonNavigationProps {
  id: string
  seasons: Season[]
  season: number
}

export const TvSeasonNavigation: React.FC<TvSeasonNavigationProps> = ({
  id,
  season,
  seasons,
}) => {
  const router = useRouter()

  const previousSeason = seasons.find(
    (s) => s.season_number === Number(season) - 1
  )
  const nextSeason = seasons.find((s) => s.season_number === Number(season) + 1)

  const goSeason = (s: number) => {
    router.push(`${pages.tv.root.link}/${id}/seasons/${s}`)
  }

  return (
    <div className="flex justify-between">
      <Button
        variant="ghost"
        disabled={!previousSeason}
        onClick={() => goSeason(Number(season) - 1)}
      >
        <ChevronLeft className="mr-2 size-4" />
        Previous Season
      </Button>

      <Button
        variant="ghost"
        disabled={!nextSeason}
        onClick={() => goSeason(Number(season) + 1)}
      >
        Next Season
        <ChevronRight className="ml-2 size-4" />
      </Button>
    </div>
  )
}
