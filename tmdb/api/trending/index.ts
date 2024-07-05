import {
  MovieWithMediaType,
  PersonWithMediaType,
  TvShowWithMediaType,
} from "@/tmdb/models"

import { api } from "../api"
import { ListResponse } from "../types"
import { TrendingRequestParams } from "./types"

const movie = ({ time, page = "1" }: TrendingRequestParams) =>
  api.fetcher<ListResponse<MovieWithMediaType>>({
    endpoint: `trending/movie/${time}`,
    params: {
      page,
    },
  })

const tv = ({ time, page = "1" }: TrendingRequestParams) =>
  api.fetcher<ListResponse<TvShowWithMediaType>>({
    endpoint: `trending/tv/${time}`,
    params: {
      page,
    },
  })

const people = ({ time, page = "1" }: TrendingRequestParams) =>
  api.fetcher<ListResponse<PersonWithMediaType>>({
    endpoint: `trending/person/${time}`,
    params: {
      page,
    },
  })

export const trending = {
  movie,
  tv,
  people,
}

export * from "./types"
