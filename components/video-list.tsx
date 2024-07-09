"use client"

import { useState } from "react"
import { Video } from "@/tmdb/models"
import { yt } from "@/tmdb/utils"
import { PlayCircle } from "lucide-react"

import { pluralize } from "@/lib/utils"

import { Label } from "./ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { VideoCard } from "./video-card"
import { VideoDialog } from "./video-dialog"

interface VideoListProps {
  videos: Video[]
}

export const VideoList = ({ videos }: VideoListProps) => {
  const [filter, setFilter] = useState("All")

  const types = [
    "All",
    ...Array.from(new Set(videos.map((video) => video.type))),
  ]

  const items = videos.filter(
    (video) => video.type === filter || filter === "All"
  )

  function handleChange(value: string) {
    setFilter(value)
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-medium">
          <span>{filter}</span>
          <span className="ml-1 align-middle text-xs text-muted-foreground">
            {items.length} {pluralize(items.length, "Item", "Items")}
          </span>
        </h2>

        <div className="flex flex-1 items-center justify-end gap-4">
          <Label
            htmlFor="filter"
            className="hidden text-muted-foreground md:block"
          >
            Filter by type
          </Label>
          <Select defaultValue="All" onValueChange={handleChange}>
            <SelectTrigger id="filter" className="max-w-48">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>

            <SelectContent>
              {types.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {items.map((video) => (
          <VideoDialog key={video.id} video={video.key} title={video.name}>
            <VideoCard.Root>
              <VideoCard.Thumbnail
                src={yt.thumbnail(video.key)}
                alt={video.name}
              />
              <VideoCard.Content>
                <h3 className="line-clamp-2 font-semibold md:text-lg">
                  {video.name}
                </h3>
                <div className="absolute inset-0 grid cursor-pointer place-items-center">
                  <PlayCircle className="size-10" />
                </div>
              </VideoCard.Content>
            </VideoCard.Root>
          </VideoDialog>
        ))}
      </div>
    </div>
  )
}
