import apiConfig from "./config"

type FetcherOptions = {
  endpoint: string
  params?: Record<string, string | undefined>
}

type Fetcher = <T>(options: FetcherOptions, init?: RequestInit) => Promise<T>

/**
 * Sanitizes the given parameters by removing entries with undefined values.
 * This ensures that only valid parameters are included in the API request.
 *
 * @param {Record<string, string | undefined>} params - The parameters to be sanitized.
 * @returns {Record<string, string>} A new parameters object with undefined values removed.
 */
const sanitizeParams = (params?: Record<string, string | undefined>) => {
  return Object.fromEntries(
    Object.entries(params ?? {}).filter(([, value]) => value !== undefined)
  )
}

/**
 * Creates a URL search params string from the given parameters.
 * Merges default parameters from the API configuration with the provided parameters.
 * Undefined parameters are filtered out.
 *
 * @param {Record<string, string | undefined>} params - The parameters to include in the search string.
 * @returns {string} The URL search params string.
 */
const createSearchParams = (params: Record<string, string | undefined>) => {
  const sanitizedParams = sanitizeParams(params)
  const mergedParams: Record<string, string> = {
    ...apiConfig.defaultParams,
    ...sanitizedParams,
  } as Record<string, string>

  return new URLSearchParams(mergedParams).toString()
}

/**
 * Creates a Headers instance for the fetch request.
 * Merges default headers from the API configuration with any headers provided in the init object.
 *
 * @param {RequestInit} [init] - Optional initial settings for the fetch request, including headers.
 * @returns {Headers} The Headers instance for the fetch request.
 */
const createHeaders = (init?: RequestInit): Headers => {
  const headers = init?.headers ?? {}
  const mergedHeaders = { ...apiConfig.defaultHeaders, ...headers }
  return new Headers(mergedHeaders)
}

/**
 * Fetches data from the specified endpoint using the provided parameters and initialization options.
 * Sanitizes parameters to remove any undefined values, constructs the full URL with parameters,
 * and performs the fetch request with custom headers.
 * Throws an error if the response is not ok.
 *
 * @template T The expected type of the response JSON.
 * @param {{ endpoint: string, params?: Record<string, string | undefined> }} options - The endpoint and optional parameters for the fetch request.
 * @param {RequestInit} [init] - Optional initial settings for the fetch request.
 * @returns {Promise<T>} A promise resolving to the response JSON in the expected type.
 */
const fetcher: Fetcher = async ({ endpoint, params }, init) => {
  const sanitizedParams = sanitizeParams(params)
  const _params = createSearchParams(sanitizedParams)
  const _headers = createHeaders(init)

  const _init = {
    ...init,
    next: { revalidate: 600, ...init?.next },
    headers: _headers,
  }

  const url = `${apiConfig.baseUrl}/${endpoint}?${_params}`
  const response = await fetch(url, _init)

  // if (!response.ok) {
  //   throw new Error(
  //     `API request failed with status ${response.status}: ${response.statusText}`
  //   )
  // }

  return await response.json()
}

export const api = {
  fetcher,
}
