import {
  MovieWithMediaType,
  PersonWithMediaType,
  TvShowWithMediaType,
} from "@/tmdb/models"

import { api } from "../api"
import { ListResponse } from "../types"
import { SearchRequestParams } from "./types"

const multi = async ({
  query,
  adult = false,
  page = "1",
}: SearchRequestParams) =>
  api.fetcher<
    ListResponse<MovieWithMediaType | TvShowWithMediaType | PersonWithMediaType>
  >({
    endpoint: "/search/multi",
    params: {
      query,
      page,
      include_adult: String(adult),
    },
  })

export const search = {
  multi,
}
