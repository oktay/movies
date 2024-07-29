import { timezones } from "@/config"
import { Movie, RawCombinedCredit } from "@/tmdb/models"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getRandomItems<T>(array: T[], count: number): T[] {
  const maxStartIndex = array.length - count
  const startIndex = Math.floor(Math.random() * (maxStartIndex + 1))
  return array.slice(startIndex, startIndex + count)
}

export function getUniqueItems(list: any[]) {
  const unique = new Map(list.map((item) => [item.id, item]))
  return Array.from(unique.values())
}

export function getDepartments(list: RawCombinedCredit[]) {
  const departments = new Set(list.map((item) => item.department))
  return Array.from(departments)
}

export function getPersonHighlights(
  {
    cast,
    crew,
    department,
  }: {
    cast: RawCombinedCredit[]
    crew: RawCombinedCredit[]
    department: string
  },
  count = 8
) {
  const sortedList = department === "Acting" ? sortCast(cast) : sortCrew(crew)
  const backdropFiltered = sortedList.filter(
    (item: RawCombinedCredit) => item.backdrop_path
  )

  return {
    highlights: sortedList.slice(0, count),
    hero: getRandomItems(backdropFiltered, 1)[0],
  }
}

export function filterByDepartment(
  list: RawCombinedCredit[],
  department: string
) {
  return list.filter((item) => item.department === department)
}

export function sortCrew(crew: RawCombinedCredit[]) {
  return getUniqueItems(crew.sort((a, b) => b.vote_count - a.vote_count))
}

export function sortCast(cast: RawCombinedCredit[]) {
  return getUniqueItems(
    cast
      .filter((item) => {
        if (item.vote_count <= 0) return false
        if (item.media_type === "tv") return item.episode_count > 8
        return item.order < 10
      })
      .sort((a, b) => {
        const aScore = a.vote_average * (a.vote_count / 1000)
        const bScore = b.vote_average * (b.vote_count / 1000)
        return bScore - aScore
      })
  )
}

export function sortByReleaseDate(
  list: Movie[],
  order: "asc" | "desc" = "asc"
) {
  return list.sort((a, b) => {
    const dateA = new Date(a.release_date).getTime()
    const dateB = new Date(b.release_date).getTime()
    return order === "asc" ? dateA - dateB : dateB - dateA
  })
}

export function pluralize(count: number, singular: string, plural: string) {
  return count === 1 ? singular : plural
}

export function joiner(arr: any[], key: string) {
  return arr.length ? arr.map((item) => item[key]).join(", ") : "—"
}

export function formatValue(value: any, formatter?: any) {
  return value ? (formatter ? formatter(value) : value) : "—"
}

export function pad(value: number) {
  return String(value).padStart(2, "0")
}

export function getUserTimezone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone
}

export function getUserRegion() {
  const userTimezone = getUserTimezone() as keyof typeof timezones
  const selectedTimezone = timezones[userTimezone]

  let country = "US"

  if (selectedTimezone?.countries?.length) {
    country = selectedTimezone.countries[0]
  }

  return country
}

export function getCountryName(code: string) {
  return new Intl.DisplayNames("en", { type: "region" }).of(code)
}
