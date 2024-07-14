import { MovieWithMediaType, TvShowWithMediaType } from "."
import { MediaType } from "./commons"

export type RawMovieCredit = MovieWithMediaType &
  CombinedCredit & {
    character: string
    release_date: string
    order: number
    department: string
    job: string
    credit_id: string
  }

export type RawTvShowCredit = TvShowWithMediaType &
  CombinedCredit & {
    character: string
    order: number
    episode_count: number
    first_air_date: string
    job: string
    department: string
    credit_id: string
  }

export type RawCombinedCredit = RawMovieCredit | RawTvShowCredit

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
