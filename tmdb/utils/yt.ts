/**
 * Generates a URL for embedding a YouTube video.
 * @param key The unique identifier for the YouTube video.
 * @param autoplay Optional parameter to enable autoplay of the video. Defaults to false.
 * @returns The URL for embedding the YouTube video with specified parameters.
 */
const video = (key: string, autoplay: boolean = false) =>
  `https://www.youtube.com/embed/${key}?rel=0&showinfo=0&autoplay=${
    autoplay ? 1 : 0
  }`

/**
 * Generates a URL for a YouTube video thumbnail.
 * @param key The unique identifier for the YouTube video.
 * @returns The URL for the video's thumbnail image.
 */
const thumbnail = (key: string) =>
  `https://img.youtube.com/vi/${key}/hqdefault.jpg`

export const yt = {
  video,
  thumbnail,
}
