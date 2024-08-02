import { api } from "@/tmdb/api/api"
import {
  DiscoverMovieRequestParams,
  DiscoverTvRequestParams,
  ListResponse,
} from "@/tmdb/api/types"
import { Movie, TvShow } from "@/tmdb/models"

/**
 * Fetches a list of movies based on the provided request parameters.
 *
 * @param args - The request parameters for discovering movies.
 * @returns A Promise that resolves to a ListResponse containing the discovered movies.
 */
const movie = (args: DiscoverMovieRequestParams) =>
  api.fetcher<ListResponse<Movie>>({
    endpoint: "discover/movie",
    params: args as Record<string, string>,
  })

/**
 * Fetches a list of tv shows based on the provided request parameters.
 *
 * @param args - The request parameters for discovering movies.
 * @returns A Promise that resolves to a ListResponse containing the discovered movies.
 */
const tv = (args: DiscoverTvRequestParams) =>
  api.fetcher<ListResponse<TvShow>>({
    endpoint: "discover/tv",
    params: args as Record<string, string>,
  })

export const discover = {
  movie,
  tv,
}
