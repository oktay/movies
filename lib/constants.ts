export const DEFAULT_URL = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : process.env.NEXT_PUBLIC_DEV_URL

export const SITE_NAME = "Movies"

export const DEFAULT_METADATA = {
  title: "Movies",
  description:
    "Millions of movies, TV shows and people to discover. Explore now.",
  twitter: {
    title: "Movies",
    description:
      "Millions of movies, TV shows and people to discover. Explore now.",
    images: "/opengraph-image.jpg",
    card: "summary_large_image",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Movies",
    description:
      "Millions of movies, TV shows and people to discover. Explore now.",
    url: DEFAULT_URL,
    siteName: "Movies",
    images: "/opengraph-image.jpg",
  },
};