import { Credits, Image, SeasonDetails } from "@/tmdb/models"

import { api } from "../api"
import {
  TvSeasonsDetailsRequestParams,
  TvSeasonsImagesRequestParams,
} from "./types"

/**
 * Fetches detailed information about a specific TV season.
 *
 * @param {TvSeasonsDetailsRequestParams} params - The parameters for the TV season details request, including the TV series ID and the season number.
 * @returns {Promise<SeasonDetails>} A promise that resolves to the detailed information about the TV season.
 * @see https://developer.themoviedb.org/reference/tv-season-details
 */
const details = <T>({
  id,
  season,
  append,
  langs,
}: TvSeasonsDetailsRequestParams) =>
  api.fetcher<SeasonDetails & T>({
    endpoint: `tv/${id}/season/${season}`,
    params: {
      append_to_response: append,
      include_image_language: langs,
    },
  })

const credits = ({ id, season }: TvSeasonsDetailsRequestParams) =>
  api.fetcher<Credits>({
    endpoint: `tv/${id}/season/${season}/credits`,
  })

const aggregateCredits = ({ id, season }: TvSeasonsDetailsRequestParams) =>
  api.fetcher<Credits>({
    endpoint: `tv/${id}/season/${season}/aggregate_credits`,
  })

const images = ({ id, season, langs }: TvSeasonsImagesRequestParams) =>
  api.fetcher<{ posters: Image[]; backdrops: Image[] }>({
    endpoint: `tv/${id}/season/${season}/images`,
    params: {
      include_image_language: langs,
    },
  })

export const tvSeasons = {
  details,
  credits,
  aggregateCredits,
  images,
}
