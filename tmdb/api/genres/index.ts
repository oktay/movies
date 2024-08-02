import { api } from "@/tmdb/api/api"
import { GenreResponse } from "@/tmdb/api/types"

/**
 * Fetches the list of movie genres from the TMDB API.
 * @returns A promise that resolves to the genre response.
 */
const movie = () =>
  api.fetcher<GenreResponse>({
    endpoint: "genre/movie/list",
  })

/**
 * Fetches the list of tv show genres from the TMDB API.
 * @returns A promise that resolves to the genre response.
 */
const tv = () =>
  api.fetcher<GenreResponse>({
    endpoint: "genre/tv/list",
  })

export const genres = {
  movie,
  tv,
}
