import Image from "next/image"
import { Episode } from "@/tmdb/models"
import { format, tmdbImage } from "@/tmdb/utils"
import { Calendar, Clock, Expand } from "lucide-react"

import { formatValue, pad } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
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
  runtime,
}) => {
  return (
    <div className="flex flex-col md:flex-row">
      <Dialog>
        <DialogTrigger className="group relative">
          <div className="relative aspect-video md:w-72" key={id}>
            <MediaBackdrop image={still_path} alt={name} size="w780" />
          </div>

          <div className="overlay grid place-items-center opacity-0 transition group-hover:opacity-100">
            <Expand />
          </div>
        </DialogTrigger>

        <DialogContent className="max-w-screen-xl">
          <div className="aspect-video">
            <Image
              src={tmdbImage.url(still_path, "original")}
              alt={still_path}
              className="rounded-md border bg-muted"
              unoptimized
              fill
            />
          </div>
        </DialogContent>
      </Dialog>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="flex items-center gap-2 font-medium">
          {pad(episode_number)}. {name}
        </h3>

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
