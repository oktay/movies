import { TvShow } from "@/tmdb/models"

import { getRandomItems } from "@/lib/utils"
import { TvHeroItem } from "@/components/tv-hero-item"

interface TvHeroProps {
  tvShows: TvShow[]
  label: string
  count?: number
  priority?: boolean
}

export const TvHero: React.FC<TvHeroProps> = ({
  tvShows,
  label,
  count = 1,
  priority,
}) => {
  const items = getRandomItems(tvShows, count)

  return items.map((item) => (
    <TvHeroItem
      key={item.id}
      id={item.id.toString()}
      label={label}
      priority={priority}
    />
  ))
}
