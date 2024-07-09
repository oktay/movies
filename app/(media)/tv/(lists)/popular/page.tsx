import { pages } from "@/config"

import { TvList } from "@/components/tv-list"

interface ListPageProps {
  searchParams?: Record<string, string>
}

export async function generateMetadata() {
  return {
    title: "Popular TV Shows",
    description: pages.tv.popular.description,
  }
}

export default async function Popular({ searchParams }: ListPageProps) {
  return (
    <TvList
      list="popular"
      page={searchParams?.page ?? "1"}
      title={pages.tv.popular.title}
      description={pages.tv.popular.description}
    />
  )
}
