import "server-only";
import { cache } from "react";
import { createUrl, getRandomItem } from "./utils";

const revalidateOptions = {
  next: {
    revalidate: 60 * 60 * 12,
  },
};

export const fetchApi = async (
  path: string,
  params?: any,
  options?: RequestInit
) => {
  const url = createUrl(path, params);
  const resp = await fetch(url, options);
  const data = await resp?.json();

  if (!resp.ok || !data) throw new Error("Network Error");

  return data;
};

// non-cached requests
export const getMedia = (type: MediaType, id: string): Promise<Media> =>
  fetchApi(`/${type}/${id}`, {
    append_to_response: "credits,images,videos,recommendations,episodes",
    include_image_language: "en",
  });

export const getRandomMedia = (items: Media[]): Promise<Media> => {
  const { id, name } = getRandomItem(items);
  return getMedia(name ? "tv" : "movie", id);
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
  fetchApi("/search/multi", { query, page });

export const getGenre = (
  type: MediaType,
  id: number,
  page: number | string = 1
): Promise<PageResult<Media>> =>
  fetchApi(`/discover/${type}`, {
    page,
    with_genres: id,
  });

export const getProviders = (
  type: MediaType,
  id: string
): Promise<ProviderResult> => fetchApi(`/${type}/${id}/watch/providers`);

export const getCollection = (id: string): Promise<CollectionResult> =>
  fetchApi(`/collection/${id}`);

// cached requests
export const getTrending = cache(
  (type: MediaType, page: number | string = 1): Promise<PageResult<Media>> =>
    fetchApi(`/trending/${type}/week`, { page }, revalidateOptions)
);

export const getQuery = cache(
  (query: QueryItem, page: number | string = 1): Promise<PageResult<Media>> =>
    fetchApi(`/${query.type}/${query.query}`, { page })
);

export const getGenreList = cache(
  (type: MediaType): Promise<GenreList> => fetchApi(`/genre/${type}/list`)
);

export const getAvailableRegions = cache(
  (): Promise<PageResult<Region>> => fetchApi(`/watch/providers/regions`)
);
