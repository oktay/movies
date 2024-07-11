import Link from "next/link"
import {
  MovieWithMediaType,
  PersonWithMediaType,
  TvShowWithMediaType,
} from "@/tmdb/models"
import { format } from "@/tmdb/utils"

import { Badge } from "@/components/ui/badge"
import { MediaCard } from "@/components/media-card"
import { Poster } from "@/components/poster"
import { Rating } from "@/components/rating"

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
        />
        <MediaCard.Content>
          {!isPerson && (
            <>
              <Rating
                average={media.vote_average}
                count={media.vote_count}
                className="mr-2"
              />
            </>
          )}
          <Badge className="border-foreground capitalize" variant="outline">
            {media.media_type === "tv" ? "TV Show" : media.media_type}
          </Badge>

          <MediaCard.Title className="mt-2">
            {isMovie ? media.title : media.name}
          </MediaCard.Title>

          <MediaCard.Excerpt>
            {isPerson
              ? `Known for ${media.known_for_department}`
              : format.year(
                  isMovie ? media.release_date : media.first_air_date
                )}
          </MediaCard.Excerpt>
        </MediaCard.Content>
      </MediaCard.Root>
    </Link>
  )
}
