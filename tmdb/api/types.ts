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
