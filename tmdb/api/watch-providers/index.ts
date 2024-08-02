import { api } from "@/tmdb/api/api"
import { ListResponse, WatchProvidersRequestParams } from "@/tmdb/api/types"
import { GetAvailableRegionsResponse, WatchProvider } from "@/tmdb/models"

/**
 * Fetches the available regions for watch providers.
 *
 * @returns {Promise<GetAvailableRegionsResponse>} A promise that resolves to a list of reviews for the movie.
 * @see https://developer.themoviedb.org/reference/watch-providers-available-regions
 */
const regions = () =>
  api.fetcher<GetAvailableRegionsResponse>({
    endpoint: `watch/providers/regions`,
  })

/**
 * Fetches the list of Movie watch providers based on the specified region.
 *
 * @param {WatchProvidersRequestParams} params - The request parameters.
 * @returns {Promise<ListResponse<WatchProvider>>} - The list of Movie watch providers.
 */
const movie = ({ region }: WatchProvidersRequestParams) =>
  api.fetcher<ListResponse<WatchProvider>>({
    endpoint: `watch/providers/movie`,
    params: {
      watch_region: region,
    },
  })

/**
 * Fetches the list of TV watch providers based on the specified region.
 *
 * @param {WatchProvidersRequestParams} params - The request parameters.
 * @returns {Promise<ListResponse<WatchProvider>>} - The list of TV watch providers.
 */
const tv = ({ region }: WatchProvidersRequestParams) =>
  api.fetcher<ListResponse<WatchProvider>>({
    endpoint: `watch/providers/tv`,
    params: {
      watch_region: region,
    },
  })

export const watchProviders = {
  regions,
  movie,
  tv,
}
