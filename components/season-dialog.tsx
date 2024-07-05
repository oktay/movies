import { tmdb } from "@/tmdb/api"
import { DialogDescription } from "@radix-ui/react-dialog"

import { getFullDate } from "@/lib/utils"

import { MediaCard } from "./media-card"
import { PosterImage } from "./poster-image"
import { Badge } from "./ui/badge"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { ScrollArea } from "./ui/scroll-area"

type SeasonDialogProps = {
  id: string
  season: number
  children: React.ReactNode
}

export const SeasonDialog: React.FC<SeasonDialogProps> = async ({
  id,
  season,
  children,
}) => {
  const { episodes, air_date, name, overview, poster_path } =
    await tmdb.tvSeasons.details({
      id,
      season,
    })

  return (
    <Dialog modal>
      <DialogTrigger className="cursor-pointer" asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-screen-xl">
        <DialogHeader>
          <div className="flex gap-4">
            <div className="relative aspect-poster w-16">
              <PosterImage
                image={poster_path!}
                alt={name}
                className="rounded-md border"
              />
            </div>
            <div className="flex-1">
              <DialogTitle>{name}</DialogTitle>
              {air_date && (
                <DialogDescription className="text-muted-foreground">
                  {getFullDate(air_date)}
                </DialogDescription>
              )}
              <DialogDescription>{overview}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {episodes?.length ? (
          <ScrollArea className="max-h-[70dvh]">
            <div className="grid gap-4 lg:grid-cols-2">
              {episodes.map((episode) => (
                <MediaCard.Root
                  className="aspect-[3/2] md:aspect-[21/9]"
                  key={episode.id}
                >
                  <PosterImage image={episode.still_path} alt={episode.name} />
                  <MediaCard.Content>
                    <Badge className="mb-2">
                      {episode.vote_average?.toFixed(1)}
                    </Badge>
                    <MediaCard.Title>
                      E{episode.episode_number}: {episode.name}
                    </MediaCard.Title>
                    <MediaCard.Excerpt className="line-clamp-6 max-w-xl">
                      {episode.overview}
                    </MediaCard.Excerpt>
                  </MediaCard.Content>
                </MediaCard.Root>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="grid place-items-center text-muted-foreground">
            No episodes
          </div>
        )}

        <DialogFooter />
      </DialogContent>
    </Dialog>
  )
}
