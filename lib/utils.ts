import { API_URL, LISTS } from "./constants";
import { languages } from "./languages";
import { timezones } from "./timezones";

export function runtime(minutes: number) {
  // seconds
  const seconds = minutes * 60;
  let secondsLeft = seconds;

  // hours
  const hours = Math.floor(secondsLeft / 3600);
  secondsLeft = secondsLeft % 3600;

  // mins
  const mins = Math.floor(secondsLeft / 60);
  secondsLeft = secondsLeft % 60;

  return `${hours ? hours + "h" : ""} ${mins}min`;
}

export function fullLang(iso: string) {
  const fullLang = languages.find((lang) => lang.iso_639_1 === iso);

  if (fullLang) {
    return fullLang.english_name;
  }

  return iso;
}

export function fullDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    dateStyle: "long",
  });
}

export function getYear(date: string) {
  return new Date(date).getFullYear();
}

export function numberWithCommas(x: number) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "decimal",
  });
  return formatter.format(x);
}

export function directors(item: Media) {
  const people = item.credits?.crew;

  if (people) {
    return people.filter((person) => person.job === "Director");
  }
}

export function getVideo(item?: Video) {
  if (!item?.key) return null;
  return `https://www.youtube.com/embed/${item.key}?rel=0&showinfo=0&autoplay=0`;
}

export function getTrailer(item: Media) {
  const trailer = item.videos?.results?.find(
    (video) => video.type === "Trailer"
  );
  return getVideo(trailer);
}

export function formatContent(string: string) {
  return string
    .split("\n")
    .filter((section) => section !== "")
    .map((section) => `<p>${section}</p>`)
    .join("");
}

export function getRegion() {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const selectedTimezone = timezones[timezone];

  if (!selectedTimezone?.countries?.length) {
    return;
  }

  return selectedTimezone.countries[0];
}

export function getGenreName(id: number, genreList: GenreList) {
  return genreList.genres.find((g) => g.id == id)?.name;
}

export const getListItem = (type: MediaType, query: Query) =>
  LISTS[type].find((item) => item.query === query);

export function createUrl(path: string, params?: any) {
  const url = new URL(API_URL);
  const searchParams = new URLSearchParams({
    ...params,
    api_key: process.env.TMDB_API_KEY,
  });

  url.pathname += path;
  url.search = searchParams.toString();

  return url.toString();
}

export function getMediaCategoryTitle(type: MediaType) {
  return type === "tv" ? "TV Shows" : "Movies";
}

export function getRandomItem(items: Media[]) {
  return items[Math.floor(Math.random() * items.length)];
}