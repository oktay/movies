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
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

  if (!timezones[timezone] || !timezones[timezone].countries.length) {
    return;
  }

  return timezones[timezone].countries[0];
}
