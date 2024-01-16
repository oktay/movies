export const DEFAULT_URL = "http://localhost:3000";

export const SITE_NAME = "Movies"

export const DEFAULT_METADATA = {
  title: "Movies",
  description:
    "Millions of movies, TV shows and people to discover. Explore now.",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Movies",
    description:
      "Millions of movies, TV shows and people to discover. Explore now.",
    url: "http://localhost:3000",
    siteName: "Movies",
    images: "/opengraph-image.jpg"
  },
};

export const ENV_URL = process.env.ENV === 'dev' ? DEFAULT_URL : "https://movies-flax-sigma.vercel.app"