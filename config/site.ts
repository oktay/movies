export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Movies App",
  description:
    "Millions of movies, TV shows and people to discover. Explore now.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
  ],
  links: {
    github: "https://github.com/oktay/movies",
  },
  author: {
    name: "Oktay Colakoglu",
    web: "https://oktaycolakoglu.com",
  },
}
