"use client"

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
import { MovieCard } from "@/components/movie-card"

interface CollectionDialogProps {
  collection: DetailedCollection
}

export const CollectionDialog: React.FC<CollectionDialogProps> = ({
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

        {parts?.length ? (
          <ScrollArea className="h-full max-h-[70dvh]">
            <div className="grid-list">
              {parts.map((part) => (
                <MovieCard key={part.id} {...part} />
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
