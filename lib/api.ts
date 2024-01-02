import "server-only";
import axios from "axios";
import { cache } from "react";

export const apiUrl = "https://api.themoviedb.org/3";

export const apiImgUrl = "https://image.tmdb.org/t/p";

export const lists = {
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

export const getListItem = (type: MediaType, query: Query) =>
  lists[type].find((item) => item.query === query);

export const api = axios.create({
  baseURL: apiUrl,
  params: {
    api_key: process.env.TMDB_API_KEY,
  },
});

export const fetchApi = cache((url: string, params?: any) =>
  api
    .get(url, { params })
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    })
);

export const getMedia = cache(
  (type: MediaType, id: string): Promise<Media> =>
    fetchApi(`/${type}/${id}`, {
      append_to_response: "credits,images,videos,recommendations,episodes",
      include_image_language: "en",
    })
);

export const getRandomMedia = cache((items: Media[]): Promise<Media> => {
  const randomItem = items[Math.floor(Math.random() * items.length)];
  const randomItemType = randomItem.name ? "tv" : "movie";

  return getMedia(randomItemType, randomItem.id);
});

export const getMediaEpisodes = cache(
  (id: string, season: number): Promise<Season> =>
    fetchApi(`/tv/${id}/season/${season}`)
);

export const getPerson = cache(
  (id: string): Promise<Person> =>
    fetchApi(`/person/${id}`, {
      append_to_response: "combined_credits,images",
    })
);

export const getSearch = (
  query: string,
  page?: number | string
): Promise<PageResult<Media & Person>> =>
  fetchApi("/search/multi", {
    query,
    page,
  });

export const getTrending = cache(
  (type: MediaType, page?: number | string): Promise<PageResult<Media>> =>
    fetchApi(`/trending/${type}/week`, {
      page,
    })
);

export const getQuery = cache(
  (query: QueryItem, page?: number | string): Promise<PageResult<Media>> =>
    fetchApi(`/${query.type}/${query.query}`, {
      page,
    })
);

export const getGenreList = cache(
  (type: MediaType): Promise<GenreList> => fetchApi(`/genre/${type}/list`)
);

export const getGenre = cache(
  (
    type: MediaType,
    id: number,
    page?: number | string
  ): Promise<PageResult<Media>> =>
    fetchApi(`/discover/${type}/`, {
      page,
      with_genres: id,
    })
);

export const getAvailableRegions = cache(
  (): Promise<PageResult<Region>> => fetchApi(`/watch/providers/regions`)
);

export const getProviders = cache(
  (type: MediaType, id: string): Promise<ProviderResult> =>
    fetchApi(`/${type}/${id}/watch/providers`)
);
