import { api } from "@/tmdb/api/api"
import { TvEpisodeDetailsRequestParams } from "@/tmdb/api/tv-episodes/types"
import { Episode, GetImagesResponse, GetVideosResponse } from "@/tmdb/models"

/**
 * Fetches detailed information about a specific TV episode.
 *
 * @template T - Additional data type to merge with the Episode response when using append_to_response.
 * @param {TvEpisodeDetailsRequestParams} params - The parameters for the TV episode details request.
 * @param {string} params.id - The ID of the TV series.
 * @param {string} params.seasonNumber - The season number of the episode.
 * @param {string} params.episodeNumber - The episode number within the season.
 * @param {string} [params.append] - Optional comma-separated list of additional data to append to the response.
 * @returns {Promise<Episode & T>} A promise that resolves to the detailed information about the TV episode.
 * @see https://developer.themoviedb.org/reference/tv-episode-details
 */
const details = <T>({
  id,
  season: seasonNumber,
  episode: episodeNumber,
  append,
}: TvEpisodeDetailsRequestParams) => {
  return api.fetcher<Episode & T>({
    endpoint: `tv/${id}/season/${seasonNumber}/episode/${episodeNumber}`,
    params: {
      append_to_response: append,
    },
  })
}

/**
 * Fetches images for a specific TV episode.
 *
 * @param {Omit<TvEpisodeDetailsRequestParams, "append">} params - The parameters for the TV episode images request.
 * @param {string} params.id - The ID of the TV series.
 * @param {string} params.seasonNumber - The season number of the episode.
 * @param {string} params.episodeNumber - The episode number within the season.
 * @returns {Promise<GetImagesResponse>} A promise that resolves to the images of the TV episode.
 * @see https://developer.themoviedb.org/reference/tv-episode-images
 */
const images = ({
  id,
  season: seasonNumber,
  episode: episodeNumber,
}: Omit<TvEpisodeDetailsRequestParams, "append">) => {
  return api.fetcher<GetImagesResponse>({
    endpoint: `tv/${id}/season/${seasonNumber}/episode/${episodeNumber}/images`,
  })
}

/**
 * Fetches videos for a specific TV episode.
 *
 * @param {Omit<TvEpisodeDetailsRequestParams, "append">} params - The parameters for the TV episode videos request.
 * @param {string} params.id - The ID of the TV series.
 * @param {string} params.seasonNumber - The season number of the episode.
 * @param {string} params.episodeNumber - The episode number within the season.
 * @returns {Promise<GetVideosResponse>} A promise that resolves to the videos of the TV episode.
 * @see https://developer.themoviedb.org/reference/tv-episode-videos
 */
const videos = ({
  id,
  season: seasonNumber,
  episode: episodeNumber,
}: Omit<TvEpisodeDetailsRequestParams, "append">) => {
  return api.fetcher<GetVideosResponse>({
    endpoint: `tv/${id}/season/${seasonNumber}/episode/${episodeNumber}/videos`,
  })
}

export const tvEpisodes = {
  details,
  images,
  videos,
}

export * from "./types"
