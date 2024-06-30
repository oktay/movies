import "server-only";
import { API_URL, LISTS } from "./constants";
import { cache } from "react";

export const getListItem = (type: MediaType, query: Query) =>
  LISTS[type].find((item) => item.query === query);

export const fetchApi = async (path: string, params?: any, options?: RequestInit) => {
  const url = new URL(API_URL);
  const searchParams = new URLSearchParams({
    ...params,
    api_key: process.env.TMDB_API_KEY,
  });

  url.pathname += path;
  url.search = searchParams.toString();

  const resp = await fetch(url.toString(), options);
  const data = await resp?.json();

  if (!resp.ok || !data) throw new Error("Network Error");

  return data;
};

export const getMedia = (type: MediaType, id: string): Promise<Media> =>
  fetchApi(`/${type}/${id}`, {
    append_to_response: "credits,images,videos,recommendations,episodes",
    include_image_language: "en",
  });

export const getRandomMedia = (items: Media[]): Promise<Media> => {
  const randomItem = items[Math.floor(Math.random() * items.length)];
  const randomItemType = randomItem.name ? "tv" : "movie";

  return getMedia(randomItemType, randomItem.id);
};

export const getMediaEpisodes = (id: string, season: number): Promise<Season> =>
  fetchApi(`/tv/${id}/season/${season}`);

export const getPerson = (id: string): Promise<Person> =>
  fetchApi(`/person/${id}`, {
    append_to_response: "combined_credits,images",
  });

export const getSearch = (
  query: string,
  page: number | string = 1
): Promise<PageResult<Media & Person>> =>
  fetchApi("/search/multi", {
    query,
    page,
  });

export const getTrending = cache(
  (type: MediaType, page: number | string = 1): Promise<PageResult<Media>> =>
    fetchApi(`/trending/${type}/week`, {
      page,
    }, {
      next: {
        revalidate: 60 * 60 * 24,
      }
    })
);

export const getQuery = cache(
  (query: QueryItem, page: number | string = 1): Promise<PageResult<Media>> =>
    fetchApi(`/${query.type}/${query.query}`, {
      page,
    }, {
      next: {
        revalidate: 60 * 60 * 24,
      }
    })
);

export const getGenreList = cache(
  (type: MediaType): Promise<GenreList> => fetchApi(`/genre/${type}/list`, undefined, {
    next: {
      revalidate: 60 * 60 * 24,
    }
  })
);

export const getGenre = (
  type: MediaType,
  id: number,
  page: number | string = 1
): Promise<PageResult<Media>> =>
  fetchApi(`/discover/${type}`, {
    page,
    with_genres: id,
  });

export const getAvailableRegions = cache(
  (): Promise<PageResult<Region>> => fetchApi(`/watch/providers/regions`)
);

export const getProviders = (
  type: MediaType,
  id: string
): Promise<ProviderResult> => fetchApi(`/${type}/${id}/watch/providers`);

export const getCollection = (id: string): Promise<CollectionResult> =>
  fetchApi(`/collection/${id}`);
