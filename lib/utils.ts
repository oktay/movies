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
