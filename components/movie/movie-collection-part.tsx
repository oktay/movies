import React from "react"
import Link from "next/link"
import { Movie } from "@/tmdb/models"
import { format } from "@/tmdb/utils"

import { cn, formatValue } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { MediaBackdrop } from "@/components/media/media-backdrop"
import { MediaPoster } from "@/components/media/media-poster"

export const MovieCollectionPart: React.FC<Movie> = ({
  id,
  title,
  backdrop_path,
  poster_path,
  vote_average,
  vote_count,
  overview,
  original_title,
  original_language,
  release_date,
}) => {
  return (
    <div className="relative">
      <div className="relative aspect-video">
        <MediaBackdrop image={backdrop_path} alt={title} size="w780" />
      </div>

      <div className="overlay-darker"></div>

      <div className="absolute inset-0 px-2 md:px-8">
        <div className="flex size-full items-center gap-6">
          <Link
            href={`/movie/${id}`}
            className="relative aspect-poster w-1/3 shrink-0"
          >
            <MediaPoster image={poster_path} alt={title} size="w342" />
          </Link>

          <div className="w-full pb-4 pt-2">
            <Link href={`/movie/${id}`}>
              <h3 className="text-md mb-2 line-clamp-1 font-semibold">
                {title}
              </h3>
            </Link>

            <div className="mb-4 hidden grid-cols-2 gap-y-2 text-xs md:grid">
              <div>
                <span className="text-muted-foreground">Year</span>
                <p>{formatValue(release_date, format.year)}</p>
              </div>

              <div>
                <span className="text-muted-foreground">Rating</span>
                <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
              </div>

              <div>
                <span className="text-muted-foreground">Language</span>
                <p>{formatValue(original_language, format.country)}</p>
              </div>

              <div>
                <span className="text-muted-foreground">Original Title</span>
                <p>{original_title}</p>
              </div>
            </div>

            <p className="line-clamp-2 text-xs text-muted-foreground xl:line-clamp-4">
              {overview}
            </p>

            <Link
              href={`/movie/${id}`}
              className={cn(
                buttonVariants({ size: "sm", variant: "default" }),
                "mt-4"
              )}
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
