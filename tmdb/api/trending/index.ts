import {
  MovieWithMediaType,
  PersonWithMediaType,
  TvShowWithMediaType,
} from "@/tmdb/models"

import { api } from "../api"
import { ListResponse } from "../types"
import { TrendingRequestParams } from "./types"

/**
 * Fetches a list of trending movies, TV shows, or people based on the specified criteria.
 *
 * @param {TrendingRequestParams} params - The parameters for the trending request, including the time window and page number.
 * @returns {Promise<ListResponse<MovieWithMediaType | TvShowWithMediaType | PersonWithMediaType>>} A promise that resolves to the list of trending movies, TV shows, or people.
 * @see https://developers.themoviedb.org/3/trending/trending-movies
 */
const movie = ({ time, page = "1" }: TrendingRequestParams) =>
  api.fetcher<ListResponse<MovieWithMediaType>>({
    endpoint: `trending/movie/${time}`,
    params: {
      page,
    },
  })

/**
 * Fetches a list of trending TV shows based on the specified criteria.
 *
 * @param {TrendingRequestParams} params - The parameters for the trending request, including the time window and page number.
 * @returns {Promise<ListResponse<TvShowWithMediaType>>} A promise that resolves to the list of trending TV shows.
 * @see https://developers.themoviedb.org/3/trending/trending-tv
 */
const tv = ({ time, page = "1" }: TrendingRequestParams) =>
  api.fetcher<ListResponse<TvShowWithMediaType>>({
    endpoint: `trending/tv/${time}`,
    params: {
      page,
    },
  })

/**
 * Fetches a list of trending people based on the specified criteria.
 *
 * @param {TrendingRequestParams} params - The parameters for the trending request, including the time window and page number.
 * @returns {Promise<ListResponse<PersonWithMediaType>>} A promise that resolves to the list of trending people.
 * @see https://developers.themoviedb.org/3/trending/trending-people
 */
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
