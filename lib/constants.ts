export const API_URL = "https://api.themoviedb.org/3";

export const IMAGE_URL = {
  ORIGINAL: "https://image.tmdb.org/t/p/original",
  POSTER: "https://image.tmdb.org/t/p/w500",
  BACKDROP: "https://image.tmdb.org/t/p/w1280",
  PROFILE: "https://image.tmdb.org/t/p/w185",
  STILL: "https://image.tmdb.org/t/p/w300",
  LOGO: "https://image.tmdb.org/t/p/w92",
}

export const LISTS = {
  movie: <QueryItem[]>[
    { title: "Popular Movies", query: "popular", type: "movie" },
    { title: "Top Rated Movies", query: "top_rated", type: "movie" },
    { title: "Upcoming Movies", query: "upcoming", type: "movie" },
    { title: "Now Playing Movies", query: "now_playing", type: "movie" },
  ],
  tv: <QueryItem[]>[
    { title: "Popular TV Shows", query: "popular", type: "tv" },
    { title: "Top Rated TV Shows", query: "top_rated", type: "tv" },
    { title: "Currently Airing TV Shows", query: "on_the_air", type: "tv" },
    { title: "TV Shows Airing Today", query: "airing_today", type: "tv" },
  ],
};