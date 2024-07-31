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
  images: {
    posters: Image[]
    backdrops: Image[]
  }
}

export type WithVideos = {
  videos: {
    results: Video[]
  }
}

export type WithCredits = {
  credits: {
    cast: Cast[]
    crew: Crew[]
  }
}
