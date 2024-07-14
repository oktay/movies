import { pages } from "@/config"

import { TvList } from "@/components/tv-list"

interface ListPageProps {
  searchParams?: Record<string, string>
}

export async function generateMetadata() {
  return {
    title: "Airing Today TV Shows",
    description: pages.tv.airingToday.description,
  }
}

export default async function AiringToday({ searchParams }: ListPageProps) {
  return (
    <TvList
      list="airing_today"
      page={searchParams?.page ?? "1"}
      title={pages.tv.airingToday.title}
      description={pages.tv.airingToday.description}
    />
  )
}
