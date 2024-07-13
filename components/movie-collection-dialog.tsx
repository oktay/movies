"use client"

import { useDialog } from "@/hooks"
import { DetailedCollection } from "@/tmdb/models"

import { sortMoviesByDate } from "@/lib/utils"
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
import { MovieCard } from "@/components/movie-card"

interface MovieCollectionDialogProps {
  collection: DetailedCollection
}

export const MovieCollectionDialog: React.FC<MovieCollectionDialogProps> = ({
  collection: { name, overview, parts },
}) => {
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

        <ScrollArea className="aspect-square pr-4 sm:aspect-video">
          <div className="grid-list">
            {sortMoviesByDate(parts).map((part) => (
              <MovieCard key={part.id} {...part} />
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
