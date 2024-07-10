import Link from "next/link"
import {
  MovieWithMediaType,
  PersonWithMediaType,
  TvShowWithMediaType,
} from "@/tmdb/models"

import { MediaCard } from "@/components/media-card"
import { Poster } from "@/components/poster"

interface SearchItemProps {
  media: MovieWithMediaType | TvShowWithMediaType | PersonWithMediaType
}

export const SearchItem: React.FC<SearchItemProps> = ({ media }) => {
  const { media_type, id } = media
  const isPerson = media_type === "person"
  const isMovie = media_type === "movie"

  return (
    <Link href={`/${media_type}/${id}`} prefetch={false}>
      <MediaCard.Root>
        <Poster
          image={isPerson ? media.profile_path : media.poster_path}
          alt={isMovie ? media.title : media.name}
          size="w500"
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
