import Link from "next/link"
import {
  MovieWithMediaType,
  PersonWithMediaType,
  TvShowWithMediaType,
} from "@/tmdb/models"

import { MediaCard } from "@/components/media-card"
import { PosterImage } from "@/components/poster-image"

export const SearchItem = ({
  media,
}: {
  media: MovieWithMediaType | TvShowWithMediaType | PersonWithMediaType
}) => {
  const { media_type, id } = media
  const isPerson = media_type === "person"
  const isMovie = media_type === "movie"

  return (
    <Link href={`/${media_type}/${id}`} prefetch={false}>
      <MediaCard.Root>
        <PosterImage
          image={isPerson ? media.profile_path : media.poster_path}
          alt={isMovie ? media.title : media.name}
        />
        <MediaCard.Content>
          <MediaCard.Title>
            {isMovie ? media.title : media.name}
          </MediaCard.Title>
        </MediaCard.Content>
      </MediaCard.Root>
    </Link>
  )
}
