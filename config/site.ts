import {
  CalendarIcon,
  ClapperboardIcon,
  HeartIcon,
  HomeIcon,
  LucideIcon,
  PlayIcon,
  RadioTowerIcon,
  StarIcon,
  TelescopeIcon,
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
  href: pages.home.link,
  icon: HomeIcon,
}

const movies = {
  title: "Movies",
  href: pages.movie.root.link,
  icon: ClapperboardIcon,
  description: pages.movie.root.description,
  items: [
    {
      title: "Discover",
      href: pages.movie.discover.link,
      icon: TelescopeIcon,
      description: pages.movie.discover.description,
    },
    {
      title: "Popular",
      href: pages.movie.popular.link,
      icon: HeartIcon,
      description: pages.movie.popular.description,
    },
    {
      title: "Now Playing",
      href: pages.movie.nowPlaying.link,
      icon: PlayIcon,
      description: pages.movie.nowPlaying.description,
    },
    {
      title: "Upcoming",
      href: pages.movie.upcoming.link,
      icon: CalendarIcon,
      description: pages.movie.upcoming.description,
    },
    {
      title: "Top Rated",
      href: pages.movie.topRated.link,
      icon: StarIcon,
      description: pages.movie.topRated.description,
    },
  ],
}

const tvShows = {
  title: "TV Shows",
  href: pages.tv.root.link,
  icon: TvIcon,
  description: pages.tv.root.description,
  items: [
    {
      title: "Discover",
      href: pages.tv.discover.link,
      icon: TelescopeIcon,
      description: pages.tv.discover.description,
    },
    {
      title: "Popular",
      href: pages.tv.popular.link,
      icon: HeartIcon,
      description: pages.tv.popular.description,
    },
    {
      title: "Airing Today",
      href: pages.tv.airingToday.link,
      icon: PlayIcon,
      description: pages.tv.airingToday.description,
    },
    {
      title: "On The Air",
      href: pages.tv.onTheAir.link,
      icon: RadioTowerIcon,
      description: pages.tv.onTheAir.description,
    },
    {
      title: "Top Rated",
      href: pages.tv.topRated.link,
      icon: StarIcon,
      description: pages.tv.topRated.description,
    },
  ],
}

const people = {
  title: "People",
  href: pages.people.root.link,
  icon: User,
  description: pages.people.root.description,
  items: [
    {
      title: "Popular",
      href: pages.people.popular.link,
      icon: HeartIcon,
      description: pages.people.popular.description,
    },
  ],
}

const trending = {
  title: "Trending",
  icon: TrendingUpIcon,
  href: pages.trending.root.link,
  description: pages.trending.root.description,
  items: [
    {
      title: "Movies",
      href: pages.trending.movie.link,
      icon: ClapperboardIcon,
      description: pages.trending.movie.description,
    },
    {
      title: "TV Shows",
      href: pages.trending.tv.link,
      icon: TvIcon,
      description: pages.trending.tv.description,
    },
    // {
    //   title: "People",
    //   href: pages.trending.people.link,
    //   icon: User,
    //   description: pages.trending.people.description,
    // },
  ],
}

export const navigation = {
  items: [home, movies, tvShows, people, trending] as NavItem[],
}

export const availableParams = [
  "with_genres",
  "with_original_language",
  "with_watch_providers",
  "with_companies",
  "with_networks",
  "primary_release_date.gte",
  "primary_release_date.lte",
  "first_air_date.gte",
  "first_air_date.lte",
  "vote_average.gte",
  "vote_average.lte",
  "vote_count.gte",
  "vote_count.lte",
]

export const pageLimit = 500
