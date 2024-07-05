import { pages } from "@/config/pages"
import { TVList } from "@/components/tv-list"

export default async function OnTheAir({
  searchParams,
}: {
  searchParams?: Record<string, string>
}) {
  return (
    <TVList
      list="on_the_air"
      page={searchParams?.page ?? "1"}
      title={pages.tv.onTheAir.title}
      description={pages.tv.onTheAir.description}
    />
  )
}
