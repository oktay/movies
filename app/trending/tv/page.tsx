import { pages } from "@/config"

import { TrendList } from "@/components/trend-list"

export default async function TrendingPage({
  searchParams,
}: {
  searchParams: Record<string, string>
}) {
  return (
    <TrendList
      type="tv"
      time="day"
      page={searchParams?.page}
      title={pages.trending.tv.title}
      description={pages.trending.tv.description}
    />
  )
}
