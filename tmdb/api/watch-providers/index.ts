import { api } from "@/tmdb/api/api"
import { GetAvailableRegionsResponse } from "@/tmdb/models"

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

export const watchProviders = {
  regions,
}
