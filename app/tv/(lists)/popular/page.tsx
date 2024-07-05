import { pages } from "@/config/pages"
import { TVList } from "@/components/tv-list"

export default async function Popular({
  searchParams,
}: {
  searchParams?: Record<string, string>
}) {
  return (
    <TVList
      list="popular"
      page={searchParams?.page ?? "1"}
      title={pages.tv.popular.title}
      description={pages.tv.popular.description}
    />
  )
}
