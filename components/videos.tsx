"use client"

import React from "react"
import Image from "next/image"
import { Video } from "@/tmdb/models"
import { yt } from "@/tmdb/utils"
import { PlayCircle } from "lucide-react"

import { VideoDialog } from "@/components/video-dialog"

interface VideosProps {
  videos: Video[]
}

export const Videos: React.FC<VideosProps> = ({ videos }) => {
  return (
    <div className="grid items-center gap-4 md:grid-cols-2 xl:grid-cols-3">
      {videos.map(({ id, key, name }) => (
        <VideoDialog key={id} video={key} title={name}>
          <div className="card relative aspect-video bg-muted">
            <Image
              className="size-full object-cover"
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
                <div className="absolute inset-0 grid cursor-pointer place-items-center">
                  <PlayCircle className="size-10" />
                </div>
              </div>
            </div>
          </div>
        </VideoDialog>
      ))}
    </div>
  )
}
