import { pages } from "@/config/pages"
import { TVList } from "@/components/tv-list"

export default async function TopRated({
  searchParams,
}: {
  searchParams?: Record<string, string>
}) {
  return (
    <TVList
      list="top_rated"
      page={searchParams?.page ?? "1"}
      title={pages.tv.topRated.title}
      description={pages.tv.topRated.description}
    />
  )
}
