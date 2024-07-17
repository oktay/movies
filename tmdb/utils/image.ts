export type ImageSize = (typeof imageSizes)[keyof typeof imageSizes]
export type PosterSize = keyof typeof imageSizes.poster
export type BackdropSize = keyof typeof imageSizes.backdrop
export type ProfileSize = keyof typeof imageSizes.profile
export type LogoSize = keyof typeof imageSizes.logo

/**
 * Object containing different sizes for TMDB images.
 */
const imageSizes = {
  backdrop: {
    w300: "w300",
    w780: "w780",
    w1280: "w1280",
    original: "original",
  },
  logo: {
    w45: "w45",
    w92: "w92",
    w154: "w154",
    w185: "w185",
    w300: "w300",
    w500: "w500",
    original: "original",
  },
  poster: {
    w92: "w92",
    w154: "w154",
    w185: "w185",
    w342: "w342",
    w500: "w500",
    w780: "w780",
    original: "original",
  },
  profile: {
    w45: "w45",
    w185: "w185",
    h632: "h632",
    original: "original",
  },
  still: {
    w92: "w92",
    w185: "w185",
    w300: "w300",
    original: "original",
  },
  original: "original",
}

/**
 * Generates a URL for an image.
 * @param path The path of the image.
 * @param type The size of the image as defined in `imageSizes`.
 * @returns The URL of the image or a placeholder image URL if the path is invalid.
 */
const url = (path: string, type: ImageSize = "original") => {
  if (!path) {
    console.error("Invalid image path provided.")
    return "/placeholder.png"
  }
  return `https://image.tmdb.org/t/p/${type}/${path}`
}

/**
 * Generates a URL for a poster image.
 * @param path The path of the poster image.
 * @param size The size of the poster image as defined in `imageSizes.poster`.
 * @returns The URL of the poster image.
 */
const poster = (path: string, size: PosterSize = "original") => {
  return url(path, imageSizes.poster[size])
}

/**
 * Generates a URL for a backdrop image.
 * @param path The path of the backdrop image.
 * @param size The size of the backdrop image as defined in `imageSizes.backdrop`.
 * @returns The URL of the backdrop image.
 */
const backdrop = (path: string, size: BackdropSize = "original") => {
  return url(path, imageSizes.backdrop[size])
}

/**
 * Generates a URL for a profile image.
 * @param path The path of the profile image.
 * @param size The size of the profile image as defined in `imageSizes.profile`.
 * @returns The URL of the profile image.
 */
const profile = (path: string, size: ProfileSize = "original") => {
  return url(path, imageSizes.profile[size])
}

/**
 * Generates the URL for a logo image.
 * @param path - The path of the image.
 * @param size - The size of the logo image. Defaults to "original".
 * @returns The URL of the logo image.
 */
const logo = (path: string, size: LogoSize = "original") => {
  return url(path, imageSizes.logo[size])
}

/**
 * Object containing functions to generate URLs for different types of TMDB images.
 */
export const tmdbImage = {
  url,
  poster,
  backdrop,
  profile,
  logo,
}
