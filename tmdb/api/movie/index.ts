import {
  Credits,
  GetImagesResponse,
  GetVideosResponse,
  Movie,
  MovieDetails,
  Review,
  WatchProviders,
} from "@/tmdb/models"

import { api } from "../api"
import { ListResponse } from "../types"
import {
  MovieCreditsRequestParams,
  MovieDetailsRequestParams,
  MovieImagesRequestParams,
  MovieListRequestParams,
  MovieProvidersRequestParams,
  MovieRecommendationsRequestParams,
  MovieReviewsRequestParams,
  MovieSimilarRequestParams,
  MovieVideosRequestParams,
} from "./types"

/**
 * Fetches a list of movies based on the specified criteria.
 *
 * @param {MovieListRequestParams} params - The parameters for the movie list request, including list type, page, and region.
 * @returns {Promise<ListResponse<Movie>>} A promise that resolves to the list of movies.
 * @see https://developer.themoviedb.org/reference/movie-now-playing-list
 * @see https://developer.themoviedb.org/reference/movie-popular-list
 * @see https://developer.themoviedb.org/reference/movie-top-rated-list
 * @see https://developer.themoviedb.org/reference/movie-upcoming-list
 */
const list = ({ list, page, region }: MovieListRequestParams) =>
  api.fetcher<ListResponse<Movie>>({
    endpoint: `movie/${list}`,
    params: {
      page,
      region,
    },
  })

/**
 * Fetches detailed information about a specific movie.
 *
 * @param {MovieDetailsRequestParams} params - The parameters for the movie details request, including the movie ID and any additional data to append.
 * @returns {Promise<MovieDetails>} A promise that resolves to the detailed information about the movie.
 * @see https://developer.themoviedb.org/reference/movie-details
 */
const detail = <T>({ id, append }: MovieDetailsRequestParams) =>
  api.fetcher<MovieDetails & T>({
    endpoint: `movie/${id}`,
    params: {
      append_to_response: append,
    },
  })

/**
 * Fetches the credits (cast and crew) for a specific movie.
 *
 * @param {MovieCreditsRequestParams} params - The parameters for the movie credits request, including the movie ID.
 * @returns {Promise<Credits>} A promise that resolves to the credits for the movie.
 * @see https://developer.themoviedb.org/reference/movie-credits
 */
const credits = ({ id }: MovieCreditsRequestParams) =>
  api.fetcher<Credits>({
    endpoint: `movie/${id}/credits`,
  })

/**
 * Fetches recommendations for a specific movie.
 *
 * @param {MovieRecommendationsRequestParams} params - The parameters for the movie recommendations request, including the movie ID and page number.
 * @returns {Promise<ListResponse<Movie>>} A promise that resolves to a list of recommended movies.
 * @see https://developer.themoviedb.org/reference/movie-recommendations
 */
const recommendations = ({ id, page }: MovieRecommendationsRequestParams) =>
  api.fetcher<ListResponse<Movie>>({
    endpoint: `movie/${id}/recommendations`,
    params: {
      page,
    },
  })

/**
 * Fetches movies similar to a specific movie.
 *
 * @param {MovieSimilarRequestParams} params - The parameters for the movie similar request, including the movie ID and page number.
 * @returns {Promise<ListResponse<Movie>>} A promise that resolves to a list of similar movies.
 * @see https://developer.themoviedb.org/reference/movie-similar
 */
const similar = ({ id, page }: MovieSimilarRequestParams) =>
  api.fetcher<ListResponse<Movie>>({
    endpoint: `movie/${id}/similar`,
    params: {
      page,
    },
  })

/**
 * Fetches images for a specific movie.
 *
 * @param {MovieImagesRequestParams} params - The parameters for the movie images request, including the movie ID and languages for the images.
 * @returns {Promise<GetImagesResponse>} A promise that resolves to the images of the movie.
 * @see https://developer.themoviedb.org/reference/movie-images
 */
const images = ({ id, langs }: MovieImagesRequestParams) =>
  api.fetcher<GetImagesResponse>({
    endpoint: `movie/${id}/images`,
    params: {
      include_image_language: langs,
    },
  })

/**
 * Fetches videos for a specific movie.
 *
 * @param {MovieVideosRequestParams} params - The parameters for the movie videos request, including the movie ID.
 * @returns {Promise<GetVideosResponse>} A promise that resolves to the videos of the movie.
 * @see https://developer.themoviedb.org/reference/movie-videos
 */
const videos = ({ id }: MovieVideosRequestParams) =>
  api.fetcher<GetVideosResponse>({
    endpoint: `movie/${id}/videos`,
  })

/**
 * Fetches reviews for a specific movie.
 *
 * @param {MovieReviewsRequestParams} params - The parameters for the movie reviews request, including the movie ID and page number.
 * @returns {Promise<ListResponse<Review>>} A promise that resolves to a list of reviews for the movie.
 * @see https://developer.themoviedb.org/reference/movie-reviews
 */
const reviews = ({ id, page }: MovieReviewsRequestParams) =>
  api.fetcher<ListResponse<Review>>({
    endpoint: `movie/${id}/reviews`,
    params: {
      page,
    },
  })

/**
 * Fetches providers for a specific movie.
 *
 * @param {MovieProvidersRequestParams} params - The parameters for the movie reviews request, including the movie ID and page number.
 * @returns {Promise<WatchProviders>} A promise that resolves to a list of reviews for the movie.
 * @see https://developer.themoviedb.org/reference/movie-watch-providers
 */
const providers = ({ id, region }: MovieProvidersRequestParams) =>
  api.fetcher<WatchProviders>({
    endpoint: `movie/${id}/watch/providers`,
    params: {
      watch_region: region,
    },
  })

export const movie = {
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
