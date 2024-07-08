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

export function getRuntime(minutes: number) {
  const seconds = minutes * 60
  let secondsLeft = seconds

  const hours = Math.floor(secondsLeft / 3600)
  secondsLeft = secondsLeft % 3600

  const mins = Math.floor(secondsLeft / 60)
  secondsLeft = secondsLeft % 60

  return `${hours ? hours + "h" : ""} ${mins}min`
}

export function getFullDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    dateStyle: "long",
  })
}

export function getYear(date: string) {
  return new Date(date).getFullYear()
}

export function numberWithCommas(x: number) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "decimal",
  })
  return formatter.format(x)
}
