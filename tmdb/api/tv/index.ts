import {
  Credits,
  GetImagesResponse,
  GetVideosResponse,
  Review,
  TvShow,
  TvShowDetails,
  WatchProviders,
} from "@/tmdb/models"

import { api } from "../api"
import { ListResponse } from "../types"
import {
  TvCreditsRequestParams,
  TvDetailsRequestParams,
  TvImagesRequestParams,
  TvListRequestParams,
  TvProvidersRequestParams,
  TvRecommendationsRequestParams,
  TvReviewsRequestParams,
  TvSimilarRequestParams,
  TvVideosRequestParams,
} from "./types"

/**
 * Fetches a list of TV shows based on the specified criteria.
 *
 * @param {TvListRequestParams} params - The parameters for the TV list request, including list type, page, and region.
 * @returns {Promise<ListResponse<TvShow>>} A promise that resolves to the list of TV shows.
 * @see https://developer.themoviedb.org/reference/tv-series-airing-today
 * @see https://developer.themoviedb.org/reference/tv-series-on-the-air
 * @see https://developer.themoviedb.org/reference/tv-series-popular
 * @see https://developer.themoviedb.org/reference/tv-series-top-rated
 */
const list = ({ list, page = "1", region, timezone }: TvListRequestParams) =>
  api.fetcher<ListResponse<TvShow>>({
    endpoint: `tv/${list}`,
    params: {
      page,
      region,
      timezone,
    },
  })

/**
 * Fetches detailed information about a specific TV series.
 *
 * @param {TvDetailsRequestParams} params - The parameters for the TV details request, including the TV series ID and any additional data to append.
 * @returns {Promise<TvShowDetails>} A promise that resolves to the detailed information about the TV series.
 * @see https://developer.themoviedb.org/reference/tv-series-details
 */
const detail = <T>({ id, append }: TvDetailsRequestParams) =>
  api.fetcher<TvShowDetails & T>({
    endpoint: `tv/${id}`,
    params: {
      append_to_response: append,
    },
  })

/**
 * Fetches the credits (cast and crew) for a specific TV series.
 *
 * @param {TvCreditsRequestParams} params - The parameters for the TV credits request, including the TV series ID.
 * @returns {Promise<Credits>} A promise that resolves to the credits for the TV series.
 * @see https://developer.themoviedb.org/reference/tv-series-credits
 */
const credits = ({ id }: TvCreditsRequestParams) =>
  api.fetcher<Credits>({
    endpoint: `tv/${id}/credits`,
  })

/**
 * Fetches recommendations for a specific TV series.
 *
 * @param {TvRecommendationsRequestParams} params - The parameters for the TV recommendations request, including the TV series ID and page number.
 * @returns {Promise<ListResponse<TvShow>>} A promise that resolves to a list of recommended TV shows.
 * @see https://developer.themoviedb.org/reference/tv-series-recommendations
 */
const recommendations = ({ id, page }: TvRecommendationsRequestParams) =>
  api.fetcher<ListResponse<TvShow>>({
    endpoint: `tv/${id}/recommendations`,
    params: {
      page,
    },
  })

/**
 * Fetches TV shows similar to a specific TV series.
 *
 * @param {TvSimilarRequestParams} params - The parameters for the TV similar request, including the TV series ID and page number.
 * @returns {Promise<ListResponse<TvShow>>} A promise that resolves to a list of similar TV shows.
 * @see https://developer.themoviedb.org/reference/tv-series-similar
 */
const similar = ({ id, page }: TvSimilarRequestParams) =>
  api.fetcher<ListResponse<TvShow>>({
    endpoint: `tv/${id}/similar`,
    params: {
      page,
    },
  })

/**
 * Fetches images for a specific TV series.
 *
 * @param {TvImagesRequestParams} params - The parameters for the TV images request, including the TV series ID and languages for the images.
 * @returns {Promise<GetImagesResponse>} A promise that resolves to the images of the TV series.
 * @see https://developer.themoviedb.org/reference/tv-series-images
 */
const images = ({ id, langs }: TvImagesRequestParams) =>
  api.fetcher<GetImagesResponse>({
    endpoint: `tv/${id}/images`,
    params: {
      include_image_language: langs,
    },
  })

/**
 * Fetches videos related to a specific TV series.
 *
 * @param {TvVideosRequestParams} params - The parameters for the TV videos request, including the TV series ID.
 * @returns {Promise<GetVideosResponse>} A promise that resolves to the videos of the TV series.
 * @see https://developer.themoviedb.org/reference/tv-series-videos
 */
const videos = ({ id }: TvVideosRequestParams) =>
  api.fetcher<GetVideosResponse>({
    endpoint: `tv/${id}/videos`,
  })

/**
 * Fetches reviews for a specific TV series.
 *
 * @param {TvReviewsRequestParams} params - The parameters for the TV reviews request, including the TV series ID and page number.
 * @returns {Promise<ListResponse<Review>>} A promise that resolves to the reviews of the TV series.
 * @see https://developer.themoviedb.org/reference/tv-series-reviews
 */
const reviews = ({ id, page }: TvReviewsRequestParams) =>
  api.fetcher<ListResponse<Review>>({
    endpoint: `tv/${id}/reviews`,
    params: {
      page,
    },
  })

/**
 * Fetches providers for a specific TV Series.
 *
 * @param {TvProvidersRequestParams} params - The parameters for the movie reviews request, including the movie ID and page number.
 * @returns {Promise<WatchProviders>} A promise that resolves to a list of reviews for the movie.
 * @see https://developer.themoviedb.org/reference/tv-series-watch-providers
 */
const providers = ({ id, region }: TvProvidersRequestParams) =>
  api.fetcher<WatchProviders>({
    endpoint: `tv/${id}/watch/providers`,
    params: {
      watch_region: region,
    },
  })

export const tv = {
  list,
  detail,
  credits,
  recommendations,
  similar,
  images,
  videos,
  reviews,
  providers,
}

export * from "./types"
