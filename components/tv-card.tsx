import React from "react"
import Link from "next/link"
import { TvShow } from "@/tmdb/models"
import { format } from "@/tmdb/utils"

import { MediaCard } from "@/components/media-card"
import { Poster } from "@/components/poster"
import { Rating } from "@/components/rating"

export const TvCard: React.FC<TvShow> = ({
  id,
  poster_path,
  name,
  vote_average,
  vote_count,
  first_air_date,
}) => {
  return (
    <Link href={`/tv/${id}`} key={id} className="w-full" prefetch={false}>
      <MediaCard.Root>
        <Poster image={poster_path} alt={name} />
        <MediaCard.Content>
          <Rating average={vote_average} count={vote_count} className="mb-2" />
          <MediaCard.Title>{name}</MediaCard.Title>
          <MediaCard.Excerpt>{format.year(first_air_date)}</MediaCard.Excerpt>
        </MediaCard.Content>
      </MediaCard.Root>
    </Link>
  )
}
