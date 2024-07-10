import { pages } from "@/config"

import { TrendList } from "@/components/trend-list"

interface TrendingPageProps {
  searchParams?: Record<string, string>
}

export async function generateMetadata() {
  return {
    title: "Trending Movies",
    description: pages.trending.movie.description,
  }
}

export default async function TrendingPage({
  searchParams,
}: TrendingPageProps) {
  return (
    <TrendList
      type="movie"
      time="day"
      title="Trending Movies"
      description={pages.trending.movie.description}
      page={searchParams?.page ?? "1"}
    />
  )
}
