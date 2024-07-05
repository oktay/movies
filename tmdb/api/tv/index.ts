import {
  Credits,
  GetImagesResponse,
  GetVideosResponse,
  TvSerieDetails,
  TvShow,
} from "@/tmdb/models"

import { api } from "../api"
import { ListResponse } from "../types"
import {
  TvCreditsRequestParams,
  TvDetailsRequestParams,
  TvImagesRequestParams,
  TvListRequestParams,
  TvRecommendationsRequestParams,
  TvSimilarRequestParams,
  TvVideosRequestParams,
} from "./types"

const list = ({ list, page = "1", region }: TvListRequestParams) =>
  api.fetcher<ListResponse<TvShow>>({
    endpoint: `tv/${list}`,
    params: {
      page,
      region,
    },
  })

const detail = ({ id, append_to_response }: TvDetailsRequestParams) =>
  api.fetcher<TvSerieDetails>({
    endpoint: `tv/${id}`,
    params: {
      append_to_response,
    },
  })

const credits = ({ id }: TvCreditsRequestParams) =>
  api.fetcher<Credits>({
    endpoint: `tv/${id}/credits`,
  })

const recommendations = ({ id, page }: TvRecommendationsRequestParams) =>
  api.fetcher<ListResponse<TvShow>>({
    endpoint: `tv/${id}/recommendations`,
    params: {
      page,
    },
  })

const similar = ({ id, page }: TvSimilarRequestParams) =>
  api.fetcher<ListResponse<TvShow>>({
    endpoint: `tv/${id}/similar`,
    params: {
      page,
    },
  })

const images = ({ id, langs }: TvImagesRequestParams) =>
  api.fetcher<GetImagesResponse>({
    endpoint: `tv/${id}/images`,
    params: {
      include_image_language: langs,
    },
  })

const videos = ({ id }: TvVideosRequestParams) =>
  api.fetcher<GetVideosResponse>({
    endpoint: `tv/${id}/videos`,
  })

export const tv = {
  list,
  detail,
  credits,
  recommendations,
  similar,
  images,
  videos,
}

export * from "./types"
