import { Episode } from "@/tmdb/models"
import { format } from "@/tmdb/utils"
import { Calendar } from "lucide-react"

import { pad } from "@/lib/utils"
import { MediaBackdrop } from "@/components/media-backdrop"
import { MediaRating } from "@/components/media-rating"

export const TvEpisodeCard: React.FC<Episode> = ({
  id,
  name,
  episode_number,
  still_path,
  vote_average,
  vote_count,
  air_date,
  overview,
}) => {
  return (
    <div>
      <div className="relative aspect-video" key={id}>
        <MediaBackdrop image={still_path} alt={name} size="w780" />
      </div>

      <div className="mt-2 flex items-start justify-between gap-2">
        <h3 className="text-base font-bold">
          <span className="text-muted-foreground">E{pad(episode_number)}</span>
          <span className="ml-1 font-medium">{name}</span>
        </h3>
        <MediaRating
          average={vote_average}
          count={vote_count}
          className="shrink-0 whitespace-nowrap"
        />
      </div>

      <div
        className="mt-1 line-clamp-6 space-y-2 text-sm text-muted-foreground"
        dangerouslySetInnerHTML={{
          __html: format.content(overview || "<em>No details</em>"),
        }}
      />

      <p className="mt-2 flex items-center text-sm">
        <Calendar className="inline size-3" />
        <span className="ml-2">{air_date && format.date(air_date)}</span>
      </p>
    </div>
  )
}
