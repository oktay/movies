import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { pages } from "@/config"

import { filterDiscoverParams } from "@/lib/utils"

export const useFilters = (type: "movie" | "tv") => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeParams = Object.fromEntries(searchParams)

  const [filters, setFilters] = useState<Record<string, any>>({
    ...filterDiscoverParams(activeParams),
  })

  const getFilter = (key: string) => {
    return filters[key] ?? undefined
  }

  const setFilter = (value: Record<string, string>) => {
    setFilters({
      ...filters,
      ...value,
    })
  }

  const pathname =
    type === "movie" ? pages.movie.discover.link : pages.tv.discover.link

  const saveFilters = () => {
    const searchParams = new URLSearchParams(filters)
    const sortBy = activeParams.sort_by

    if (sortBy) {
      searchParams.set("sort_by", sortBy)
    }

    router.replace(`${pathname}?${searchParams.toString()}`)
  }

  const clearFilters = () => {
    const searchParams = new URLSearchParams()
    const sortBy = activeParams.sort_by

    if (sortBy) {
      searchParams.set("sort_by", sortBy)
    }

    setFilters({})
    router.replace(`${pathname}?${searchParams.toString()}`)
  }

  const count = Object.values(filters).filter(Boolean).length

  return {
    filters,
    count,
    getFilter,
    setFilter,
    saveFilters,
    clearFilters,
  }
}
