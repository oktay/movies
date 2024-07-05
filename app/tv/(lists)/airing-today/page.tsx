import { pages } from "@/config/pages"
import { TVList } from "@/components/tv-list"

export default async function AiringToday({
  searchParams,
}: {
  searchParams?: Record<string, string>
}) {
  return (
    <TVList
      list="airing_today"
      page={searchParams?.page ?? "1"}
      title={pages.tv.airingToday.title}
      description={pages.tv.airingToday.description}
    />
  )
}
