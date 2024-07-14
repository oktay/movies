import { pages } from "@/config"

import { TrendList } from "@/components/trend-list"

interface TrendingPageProps {
  searchParams?: Record<string, string>
}

export async function generateMetadata() {
  return {
    title: "Trending People",
    description: pages.trending.tv.description,
  }
}

export default async function TrendingPage({
  searchParams,
}: TrendingPageProps) {
  return (
    <TrendList
      type="people"
      time="day"
      title="Trending People"
      description={pages.trending.people.description}
      page={searchParams?.page ?? "1"}
    />
  )
}
