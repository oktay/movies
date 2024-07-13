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

export function filterByDepartment(
  list: RawCombinedCredit[],
  department: string
) {
  return list.filter((item) => item.department === department)
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

export function sortMoviesByDate(list: Movie[], order: "asc" | "desc" = "asc") {
  return list.sort((a, b) => {
    const dateA = new Date(a.release_date).getTime()
    const dateB = new Date(b.release_date).getTime()
    return order === "asc" ? dateA - dateB : dateB - dateA
  })
}
