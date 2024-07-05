import { pages } from "@/config/pages"
import { TrendList } from "@/components/trend-list"

export default async function TrendingPage({
  searchParams,
}: {
  searchParams: Record<string, string>
}) {
  return (
    <TrendList
      type="movie"
      time="day"
      page={searchParams?.page}
      title={pages.trending.movie.title}
      description={pages.trending.movie.description}
    />
  )
}
