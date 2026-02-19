import Link from "next/link"
import { Movie, TvShow } from "@/tmdb/models"
import { format } from "@/tmdb/utils"

import { cn, formatValue } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { MediaBackdrop } from "@/components/media/media-backdrop"
import { MediaPoster } from "@/components/media/media-poster"

export const MediaPreview: React.FC<Movie | TvShow> = (props) => {
  const type = "title" in props ? "movie" : "tv"

  const title = "title" in props ? props.title : props.name

  const original_title =
    "original_title" in props ? props.original_title : props.original_name

  const release_date =
    "release_date" in props ? props.release_date : props.first_air_date

  const {
    backdrop_path,
    poster_path,
    vote_average,
    overview,
    original_language,
  } = props

  return (
    <div>
      <div className="relative aspect-video w-full">
        <MediaBackdrop
          image={backdrop_path}
          alt={title}
          className="absolute inset-0"
          size="w780"
        />
      </div>

      <div className="flex items-start px-2">
        <div className="relative -mt-16 mr-4 aspect-poster w-24 shrink-0">
          <MediaPoster image={poster_path} alt={title} size="w342" />
        </div>

        <div className="pb-4 pt-2">
          <h3 className="text-md mb-2 font-semibold">{title}</h3>

          <div className="mb-4 grid grid-cols-2 gap-y-2 text-xs">
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

          <p className="line-clamp-4 text-xs text-muted-foreground">
            {overview}
          </p>

          <Link
            href={`/${type}/${props.id}`}
            className={cn(
              buttonVariants({ size: "sm", variant: "outline" }),
              "mt-4"
            )}
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}
