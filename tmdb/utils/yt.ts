const video = (key: string, autoplay?: boolean) =>
  `https://www.youtube.com/embed/${key}?rel=0&showinfo=0&autoplay=${
    autoplay ? 1 : 0
  }`

const thumbnail = (key: string) =>
  `https://img.youtube.com/vi/${key}/hqdefault.jpg`

export const yt = {
  video,
  thumbnail,
}
