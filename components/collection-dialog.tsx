import Link from "next/link"
import { tmdb } from "@/tmdb/api"
import { DialogDescription } from "@radix-ui/react-dialog"

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

type CollectionDialogProps = {
  id: number
  children: React.ReactNode
}

export const CollectionDialog: React.FC<CollectionDialogProps> = async ({
  id,
  children,
}) => {
  const { name, overview, parts } = await tmdb.collection.details({
    id,
  })

  return (
    <Dialog modal>
      <DialogTrigger className="cursor-pointer" asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-screen-lg">
        <DialogHeader>
          <DialogTitle>{name}</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {overview}
          </DialogDescription>
        </DialogHeader>

        {parts?.length ? (
          <ScrollArea className="h-full max-h-[70dvh]">
            <div className="grid-list">
              {parts.map((part) => (
                <Link href={`/movie/${part.id}`} key={part.id}>
                  <MediaCard.Root>
                    <PosterImage image={part.poster_path} alt={part.title} />
                    <MediaCard.Content>
                      <Badge className="mb-2">
                        {part.vote_average?.toFixed(1)}
                      </Badge>
                      <MediaCard.Title>{part.title}</MediaCard.Title>
                      <MediaCard.Excerpt className="line-clamp-6 max-w-xl">
                        {part.overview}
                      </MediaCard.Excerpt>
                    </MediaCard.Content>
                  </MediaCard.Root>
                </Link>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="grid place-items-center text-muted-foreground">
            No parts found
          </div>
        )}

        <DialogFooter />
      </DialogContent>
    </Dialog>
  )
}
