export type MovieListType = "popular" | "top_rated" | "now_playing" | "upcoming"

export type MovieListRequestParams = {
  list: MovieListType
  page?: string
  region?: string
}

export type MovieDetailsRequestParams = {
  id: string | number
  append?: string
}

export type MovieCreditsRequestParams = {
  id: string | number
}

export type MovieRecommendationsRequestParams = {
  id: string | number
  page?: string
}

export type MovieSimilarRequestParams = {
  id: string | number
  page?: string
}

export type MovieImagesRequestParams = {
  id: string | number
  langs?: string
}

export type MovieVideosRequestParams = {
  id: string | number
}

export type MovieReviewsRequestParams = {
  id: string | number
  page?: string
}

export type MovieProvidersRequestParams = {
  id: string | number
  region?: string
}
