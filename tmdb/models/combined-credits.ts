import { MovieWithMediaType, TvShowWithMediaType } from "."
import { MediaType } from "./commons"

export type RawMovieCredit = MovieWithMediaType &
  CombinedCredit & {
    character: string
  }

export type RawTvSerieCredit = TvShowWithMediaType &
  CombinedCredit & {
    character: string
  }

export type RawCombinedCredit = RawMovieCredit | RawTvSerieCredit

export type CombinedCreditsResponse = {
  cast: Array<RawCombinedCredit>
  crew: Array<RawCombinedCredit>
}

export type CombinedCredit = {
  id: number
  adult: boolean
  title: string
  date: string
  media_type: MediaType
  role: string
  vote_average: number
  vote_count: number
  backdrop_path?: string
  department?: string
}

export type CombinedCredits = {
  cast: Array<CombinedCredit>
  crew: Array<CombinedCredit>
}
