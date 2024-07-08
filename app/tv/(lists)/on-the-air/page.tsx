import { pages } from "@/config"

import { TVList } from "@/components/tv-list"

interface ListPageProps {
  searchParams?: Record<string, string>
}

export async function generateMetadata() {
  return {
    title: "On The Air TV Shows",
    description: pages.tv.onTheAir.description,
  }
}

export default async function OnTheAir({ searchParams }: ListPageProps) {
  return (
    <TVList
      list="on_the_air"
      page={searchParams?.page ?? "1"}
      title={pages.tv.onTheAir.title}
      description={pages.tv.onTheAir.description}
    />
  )
}
