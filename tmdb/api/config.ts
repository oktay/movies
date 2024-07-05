const baseUrl = "https://api.themoviedb.org/3"

const defaultHeaders = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_KEY}`,
}

const defaultParams = {
  language: "en-US",
}

const apiConfig = {
  baseUrl,
  defaultHeaders,
  defaultParams,
}

export default apiConfig
