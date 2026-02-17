import { Movie } from "@/tmdb/models"

import { getRandomItems } from "@/lib/utils"
import { MovieHeroItem } from "@/components/movie-hero-item"

interface MovieHeroProps {
  movies: Movie[]
  label: string
  count?: number
  priority?: boolean
}

export const MovieHero: React.FC<MovieHeroProps> = ({
  movies,
  label,
  count = 1,
  priority,
}) => {
  const items = getRandomItems(movies, count)

  return items.map((item) => (
    <MovieHeroItem
      key={item.id}
      id={item.id.toString()}
      label={label}
      priority={priority}
    />
  ))
}
