"use client"

import React from "react"
import Image from "next/image"
import { Video } from "@/tmdb/models"
import { yt } from "@/tmdb/utils"
import { PlayCircle } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"

interface VideosProps {
  videos: Video[]
}

export const Videos: React.FC<VideosProps> = ({ videos }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {videos.map(({ id, key, name }) => (
        <Dialog key={id} modal>
          <DialogTrigger asChild>
            <div className="relative aspect-video cursor-pointer bg-muted">
              <Image
                className="size-full rounded-md border object-cover"
                src={yt.thumbnail(key)}
                alt={name}
                unoptimized
                fill
              />
              <div className="overlay">
                <div className="p-4 md:p-6">
                  <h3 className="line-clamp-2 font-semibold md:text-lg">
                    {name}
                  </h3>
                  <PlayCircle className="absolute left-1/2 top-1/2 size-10 -translate-x-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-screen-xl">
            <DialogHeader>
              <DialogTitle>{name}</DialogTitle>
            </DialogHeader>

            <iframe
              className="aspect-video size-full rounded-md"
              src={yt.video(key, true)}
              allow="autoplay; encrypted-media"
              allowFullScreen={true}
            />
          </DialogContent>
        </Dialog>
      ))}
    </div>
  )
}
