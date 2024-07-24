/**
 * Formats a given string into HTML paragraphs. Each line in the input string becomes a separate paragraph.
 * @param string The input string to format.
 * @returns A string of HTML paragraphs.
 */
const content = (string: string) => {
  return string
    .split("\n")
    .filter((section) => section !== "")
    .map((section) => `<p>${section}</p>`)
    .join("")
}

/**
 * Formats a duration from minutes into a human-readable string.
 * @param minutes The duration in minutes.
 * @returns A string representing the duration in hours and minutes.
 */
const runtime = (minutes: number) => {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60

  return `${hours ? hours + "h" : ""} ${mins}min`
}

/**
 * Formats a date string into a human-readable long date format.
 * @param date The date string to format.
 * @returns A string representing the formatted date.
 */
const date = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    dateStyle: "long",
  })
}

/**
 * Extracts the year from a date string.
 * @param date The date string to extract the year from.
 * @returns The year as a number.
 */
const year = (date: string) => new Date(date).getFullYear()

/**
 * Formats a number into a currency string.
 * @param x The number to format.
 * @returns A string representing the formatted currency.
 */
const currency = (x: number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  })
  return formatter.format(x)
}

export const format = {
  content,
  runtime,
  date,
  year,
  currency,
}
