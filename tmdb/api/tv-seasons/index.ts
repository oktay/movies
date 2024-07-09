import { SeasonDetails } from "@/tmdb/models"

import { api } from "../api"
import { TvSeasonsDetailsRequestParams } from "./types"

/**
 * Fetches detailed information about a specific TV season.
 *
 * @param {TvSeasonsDetailsRequestParams} params - The parameters for the TV season details request, including the TV series ID and the season number.
 * @returns {Promise<SeasonDetails>} A promise that resolves to the detailed information about the TV season.
 * @see https://developer.themoviedb.org/reference/tv-season-details
 */
const details = ({ id, season }: TvSeasonsDetailsRequestParams) =>
  api.fetcher<SeasonDetails>({
    endpoint: `tv/${id}/season/${season}`,
  })

export const tvSeasons = {
  details,
}
