export type SortByType =
  | "popularity.asc"
  | "popularity.desc"
  | "vote_average.asc"
  | "vote_average.desc"
  | "vote_count.asc"
  | "vote_count.desc"

export type SortByTypeMovie =
  | SortByType
  | "primary_release_date.asc"
  | "primary_release_date.desc"
  | "release_date.asc"
  | "release_date.desc"
  | "revenue.asc"
  | "revenue.desc"
  | "original_title.asc"
  | "original_title.desc"

export type SortByTypeTv =
  | SortByType
  | "first_air_date.asc"
  | "first_air_date.desc"
  | "vote_average.asc"
  | "vote_average.desc"
  | "vote_count.asc"
  | "vote_count.desc"
  | "original_name.asc"
  | "original_name.desc"

export type DiscoverRequestParams = {
  page?: string
  sort_by?: SortByTypeMovie
  certification?: string
  "certification.gte"?: string
  "certification.lte"?: string
  certification_country?: string
  include_adult?: boolean
  include_video?: boolean
  "vote_average.gte"?: string
  "vote_average.lte"?: string
  "vote_count.gte"?: string
  "vote_count.lte"?: string
  "with_runtime.gte"?: string
  "with_runtime.lte"?: string
  with_cast?: string
  with_crew?: string
  with_companies?: string
  with_genres?: string
  with_keywords?: string
  with_people?: string
  with_networks?: string
  with_original_language?: string
  with_release_type?: string
  with_watch_providers?: string
  with_watch_monetization_types?: string
  watch_region?: string
  without_genres?: string
  without_keywords?: string
  year?: string
}

export type DiscoverMovieRequestParams = DiscoverRequestParams & {
  primary_release_year?: string
  "primary_release_date.gte"?: string
  "primary_release_date.lte"?: string
  "release_date.gte"?: string
  "release_date.lte"?: string
}

export type DiscoverTvRequestParams = DiscoverRequestParams & {
  first_air_date_year?: string
  "first_air_date.gte"?: string
  "first_air_date.lte"?: string
}
