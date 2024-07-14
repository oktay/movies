import React from "react"
import Link from "next/link"
import { Movie } from "@/tmdb/models"
import { format } from "@/tmdb/utils"

import { formatValue } from "@/lib/utils"
import { MediaCard } from "@/components/media-card"
import { MediaPoster } from "@/components/media-poster"
import { MediaRating } from "@/components/media-rating"

export const MovieCard: React.FC<Movie> = ({
  id,
  poster_path,
  title,
  vote_average,
  vote_count,
  release_date,
}) => {
  return (
    <Link href={`/movie/${id}`} key={id} prefetch={false}>
      <MediaCard.Root>
        <MediaPoster image={poster_path} alt={title} />
        <MediaCard.Content>
          <MediaRating
            average={vote_average}
            count={vote_count}
            className="mb-2"
          />
          <MediaCard.Title>{title}</MediaCard.Title>
          <MediaCard.Excerpt>
            {formatValue(release_date, format.year)}
          </MediaCard.Excerpt>
        </MediaCard.Content>
      </MediaCard.Root>
    </Link>
  )
}
