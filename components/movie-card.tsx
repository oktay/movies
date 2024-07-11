import React from "react"
import Link from "next/link"
import { Movie } from "@/tmdb/models"
import { format } from "@/tmdb/utils"

import { MediaCard } from "@/components/media-card"
import { Poster } from "@/components/poster"
import { Rating } from "@/components/rating"

export const MovieCard: React.FC<Movie> = ({
  id,
  poster_path,
  title,
  vote_average,
  vote_count,
  release_date,
}) => {
  return (
    <Link href={`/movie/${id}`} key={id} className="w-full" prefetch={false}>
      <MediaCard.Root>
        <Poster image={poster_path} alt={title} />
        <MediaCard.Content>
          <Rating average={vote_average} count={vote_count} className="mb-2" />
          <MediaCard.Title>{title}</MediaCard.Title>
          <MediaCard.Excerpt>{format.year(release_date)}</MediaCard.Excerpt>
        </MediaCard.Content>
      </MediaCard.Root>
    </Link>
  )
}
