import { Cast, Crew, Image, Video } from "@/tmdb/models"

export * from "./movie/types"
export * from "./trending/types"
export * from "./tv/types"
export * from "./person/types"

export type ListResponse<T> = {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

export type WithImages = {
  images: Image[]
}

export type WithVideos = {
  videos: Video[]
}

export type WithCredits = {
  cast: Cast[]
  crew: Crew[]
}
