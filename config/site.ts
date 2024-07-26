import {
  CalendarIcon,
  ClapperboardIcon,
  HeartIcon,
  HomeIcon,
  LucideIcon,
  PlayIcon,
  RadioTowerIcon,
  StarIcon,
  TrendingUpIcon,
  TvIcon,
  User,
} from "lucide-react"

import { pages } from "@/config/pages"

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
    next: "https://nextjs.org",
    vercel: "https://vercel.com",
    tmdb: "https://www.themoviedb.org",
    shadcn: "https://ui.shadcn.com/",
  },
  author: {
    name: "Oktay Colakoglu",
    web: "https://oktaycolakoglu.com",
  },
}

export type NavItem = {
  title: string
  href: string
  icon: LucideIcon
  description?: string
  items?: NavItem[]
}

const home = {
  title: "Home",
  href: "/",
  icon: HomeIcon,
}

const movies = {
  title: "Movies",
  href: "/movie",
  icon: ClapperboardIcon,
  description: pages.movie.root.description,
  items: [
    // {
    //   title: "Discover",
    //   href: "/movie/discover",
    //   icon: TelescopeIcon,
    //   description: pages.movie.discover.description,
    // },
    {
      title: "Popular",
      href: "/movie/popular",
      icon: HeartIcon,
      description: pages.movie.popular.description,
    },
    {
      title: "Now Playing",
      href: "/movie/now-playing",
      icon: PlayIcon,
      description: pages.movie.nowPlaying.description,
    },
    {
      title: "Upcoming",
      href: "/movie/upcoming",
      icon: CalendarIcon,
      description: pages.movie.upcoming.description,
    },
    {
      title: "Top Rated",
      href: "/movie/top-rated",
      icon: StarIcon,
      description: pages.movie.topRated.description,
    },
  ],
}

const tvShows = {
  title: "TV Shows",
  href: "/tv",
  icon: TvIcon,
  description: pages.tv.root.description,
  items: [
    // {
    //   title: "Discover",
    //   href: "/tv/discover",
    //   icon: TelescopeIcon,
    //   description: pages.tv.discover.description,
    // },
    {
      title: "Popular",
      href: "/tv/popular",
      icon: HeartIcon,
      description: pages.tv.popular.description,
    },
    {
      title: "Airing Today",
      href: "/tv/airing-today",
      icon: PlayIcon,
      description: pages.tv.airingToday.description,
    },
    {
      title: "On The Air",
      href: "/tv/on-the-air",
      icon: RadioTowerIcon,
      description: pages.tv.onTheAir.description,
    },
    {
      title: "Top Rated",
      href: "/tv/top-rated",
      icon: StarIcon,
      description: pages.tv.topRated.description,
    },
  ],
}

const people = {
  title: "People",
  href: "/people",
  icon: User,
  description: pages.people.root.description,
  items: [
    {
      title: "Popular",
      href: "/person/popular",
      icon: HeartIcon,
      description: pages.people.popular.description,
    },
  ],
}

const trending = {
  title: "Trending",
  icon: TrendingUpIcon,
  href: "/trending",
  description: pages.trending.root.description,
  items: [
    {
      title: "Movies",
      href: "/trending/movie",
      icon: ClapperboardIcon,
      description: pages.trending.movie.description,
    },
    {
      title: "TV Shows",
      href: "/trending/tv",
      icon: TvIcon,
      description: pages.trending.tv.description,
    },
    // {
    //   title: "People",
    //   href: "/trending/people",
    //   icon: User,
    //   description: pages.trending.people.description,
    // },
  ],
}

export const navigation = {
  items: [home, movies, tvShows, people, trending] as NavItem[],
}
