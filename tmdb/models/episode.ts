import { Crew, GuestStar } from "@/tmdb/models/credits"

export type Episode = {
  crew: Crew[]
  episode_number: number
  guest_stars: GuestStar[]
  name: string
  overview: string
  id: number
  production_code: string
  season_number: number
  still_path: string | null
  vote_average: number
  vote_count: number
}
