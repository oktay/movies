import Link from "next/link"
import { pages } from "@/config"
import { Episode } from "@/tmdb/models"
import { format } from "@/tmdb/utils"
import { Calendar, Clock } from "lucide-react"

import { formatValue, pad } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { MediaBackdrop } from "@/components/media/media-backdrop"
import { MediaRating } from "@/components/media/media-rating"

export const TvEpisodeCard: React.FC<Episode> = ({
  id,
  name,
  episode_number,
  still_path,
  vote_average,
  vote_count,
  air_date,
  overview,
  runtime,
  season_number,
  show_id,
}) => {
  return (
    <div className="flex flex-col md:flex-row">
      <Link
        href={`${pages.tv.root.link}/${show_id}/seasons/${season_number}/episodes/${episode_number}`}
        className="relative aspect-video md:w-72"
        key={id}
      >
        <MediaBackdrop image={still_path} alt={name} size="w780" />
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <Link
          href={`${pages.tv.root.link}/${show_id}/seasons/${season_number}/episodes/${episode_number}`}
        >
          <h3 className="flex items-center gap-2 font-medium">
            {pad(episode_number)}. {name}
          </h3>
        </Link>

        <div
          className="mb-4 mt-1 line-clamp-6 space-y-2 text-sm leading-relaxed text-muted-foreground"
          dangerouslySetInnerHTML={{
            __html: format.content(overview || "<em>No details</em>"),
          }}
        />

        <div className="mt-auto flex items-center gap-2">
          <MediaRating
            average={vote_average}
            count={vote_count}
            className="leading-none"
          />

          <Badge variant="outline">
            <Clock className="inline size-3" />
            <span className="ml-2">{formatValue(runtime, format.runtime)}</span>
          </Badge>

          <Badge variant="outline">
            <Calendar className="inline size-3" />
            <span className="ml-2">{formatValue(air_date, format.date)}</span>
          </Badge>
        </div>
      </div>
    </div>
  )
}
