import apiConfig from "./config"

type FetcherOptions = {
  endpoint: string
  params?: Record<string, string | undefined>
}

type Fetcher = <T>(options: FetcherOptions, init?: RequestInit) => Promise<T>

const fetcher: Fetcher = async ({ endpoint, params }, init) => {
  const sanitizedParams = Object.fromEntries(
    Object.entries(params ?? {}).filter(([, value]) => value !== undefined)
  )

  const _params = new URLSearchParams({
    ...apiConfig.defaultParams,
    ...sanitizedParams,
  }).toString()

  const _headers = new Headers({
    ...apiConfig.defaultHeaders,
    ...(init?.headers ?? {}),
  })

  const _init = {
    ...init,
    headers: _headers,
  }

  const url = `${apiConfig.baseUrl}/${endpoint}?${_params}`
  const response = await fetch(url, _init)

  return await response.json()
}

export const api = {
  fetcher,
}
