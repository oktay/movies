"use client"

import Link from "next/link"
import { useDialog } from "@/hooks"
import { DetailedCollection } from "@/tmdb/models"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MediaCard } from "@/components/media-card"
import { Poster } from "@/components/poster"

import { Rating } from "./rating"

interface CollectionDialogProps {
  collection: DetailedCollection
}

export const CollectionDialog: React.FC<CollectionDialogProps> = ({
  collection,
}) => {
  const { name, overview, parts } = collection
  const [open, setOpen] = useDialog()

  return (
    <Dialog open={open} onOpenChange={setOpen} modal>
      <DialogTrigger asChild>
        <Button className="mt-4">View Collection</Button>
      </DialogTrigger>

      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="max-w-screen-lg"
      >
        <DialogHeader>
          <DialogTitle>{name}</DialogTitle>
          <DialogDescription className="hidden text-muted-foreground md:block">
            {overview}
          </DialogDescription>
        </DialogHeader>

        {parts?.length ? (
          <ScrollArea className="h-full max-h-[70dvh]">
            <div className="grid-list">
              {parts.map((part) => (
                <Link href={`/movie/${part.id}`} key={part.id} prefetch={false}>
                  <MediaCard.Root>
                    <Poster
                      image={part.poster_path}
                      alt={part.title}
                      size="w500"
                    />
                    <MediaCard.Content>
                      <Rating
                        average={part.vote_average}
                        count={part.vote_count}
                      />
                      <MediaCard.Title>{part.title}</MediaCard.Title>
                      <MediaCard.Excerpt className="line-clamp-3 max-w-xl">
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
      </DialogContent>
    </Dialog>
  )
}
