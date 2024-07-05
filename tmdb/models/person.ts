import { WithMediaType } from "./commons"
import { MovieWithMediaType } from "./movie"
import { TvShowWithMediaType } from "./tv"

export type Person = {
  id: number
  name: string
  known_for: Array<MovieWithMediaType | TvShowWithMediaType>
  profile_path: string
  adult: boolean
  known_for_department: string
  gender: number
  popularity: number
}
export type PersonWithMediaType = WithMediaType<Person, "person">

export type PersonDetails = {
  adult: boolean
  also_known_as: string[]
  birthday: string
  biography: string
  deathday?: string
  gender: number
  homepage?: string
  id: number
  imdb_id: string
  known_for_department: string
  name: string
  place_of_birth: string
  popularity: number
  profile_path: string
}
