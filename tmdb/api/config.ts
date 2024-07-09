/**
 * Configuration for the TMDB API.
 *
 * Defines the base URL for all API requests, default headers including content type and authorization,
 * and default parameters such as the language setting.
 */

/**
 * The base URL for the TMDB API.
 * @type {string}
 */
const baseUrl: string = "https://api.themoviedb.org/3"

/**
 * Default headers for API requests.
 * Includes the Content-Type and Authorization constructed using the TMDB_KEY environment variable.
 * @type {Record<string, string>}
 */
const defaultHeaders: Record<string, string> = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.TMDB_KEY}`,
}

/**
 * Default parameters for API requests.
 * Currently, only includes the default language setting.
 * @type {Record<string, string>}
 */
const defaultParams: Record<string, string> = {
  language: "en-US",
}

/**
 * The aggregated API configuration object.
 * Combines the baseUrl, defaultHeaders, and defaultParams into a single object for export.
 * @type {{ baseUrl: string, defaultHeaders: Record<string, string>, defaultParams: Record<string, string> }}
 */
const apiConfig: {
  baseUrl: string
  defaultHeaders: Record<string, string>
  defaultParams: Record<string, string>
} = {
  baseUrl,
  defaultHeaders,
  defaultParams,
}

export default apiConfig
