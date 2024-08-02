import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

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

  const pathname = type === "movie" ? "/movie/discover" : "/tv/discover"

  const saveFilters = () => {
    const searchParams = new URLSearchParams(filters)
    router.replace(`${pathname}?${searchParams.toString()}`)
  }

  const clearFilters = () => {
    setFilters({})
    router.replace(pathname)
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
