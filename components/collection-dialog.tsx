"use client"

import Link from "next/link"
import { useDialog } from "@/hooks"
import { DetailedCollection } from "@/tmdb/models"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MediaCard } from "@/components/media-card"
import { PosterImage } from "@/components/poster-image"

export const CollectionDialog = ({
  collection: { name, overview, parts },
}: {
  collection: DetailedCollection
}) => {
  const [open, setOpen] = useDialog()

  return (
    <Dialog open={open} onOpenChange={setOpen} modal>
      <DialogTrigger asChild>
        <Button className="mt-4">View Collection</Button>
      </DialogTrigger>

      <DialogContent className="max-w-screen-lg">
        <DialogHeader>
          <DialogTitle>{name}</DialogTitle>
          <DialogDescription className="hidden text-muted-foreground md:block">
            {overview}
          </DialogDescription>
        </DialogHeader>

        {parts?.length ? (
          <ScrollArea className="h-full max-h-[70dvh]">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
              {parts.map((part) => (
                <Link href={`/movie/${part.id}`} key={part.id}>
                  <MediaCard.Root>
                    <PosterImage image={part.poster_path} alt={part.title} />
                    <MediaCard.Content>
                      <Badge className="mb-2">
                        {part.vote_average?.toFixed(1)}
                      </Badge>
                      <MediaCard.Title>{part.title}</MediaCard.Title>
                      <MediaCard.Excerpt className="line-clamp-3 max-w-xl md:line-clamp-6">
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
