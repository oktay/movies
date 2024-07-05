import { SeasonDetails } from "@/tmdb/models"

import { api } from "../api"
import { TvSeasonsDetailsRequestParams } from "./types"

const details = ({ id, season }: TvSeasonsDetailsRequestParams) =>
  api.fetcher<SeasonDetails>({
    endpoint: `tv/${id}/season/${season}`,
  })

export const tvSeasons = {
  details,
}
