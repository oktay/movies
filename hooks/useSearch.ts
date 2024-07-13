"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { sendGAEvent } from "@next/third-parties/google"
import { track } from "@vercel/analytics"
import { useDebounce } from "use-debounce"

export const useSearch = (auto: boolean = true) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const query = searchParams.get("q")

  const [page, setPage] = useState<string>()
  const [term, setTerm] = useState(query ?? "")
  const [value] = useDebounce(term, 500)

  useEffect(() => {
    if (pathname !== "/search") {
      setPage(pathname)
    }
    if (!query) {
      setTerm("")
    }
  }, [pathname, query])

  useEffect(() => {
    if (auto) {
      handleSearch(value)
    }
  }, [value, auto]) // eslint-disable-line react-hooks/exhaustive-deps

  function handleSearch(value: string) {
    if (value !== "") {
      router.push(`/search?q=${value}`)

      sendGAEvent("event", "search", {
        search_term: value,
      })
      track("Search", {
        search_term: value,
      })

      return
    }

    if (!page && pathname === "/search") {
      router.replace("/", {
        scroll: true,
      })
      return
    }

    if (page && pathname !== page) {
      router.replace(page, {
        scroll: true,
      })
      return
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTerm(event.target.value)
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" && query !== value && !auto) {
      handleSearch(value)
    }

    if (event.key === "Escape") {
      clearSearch()
    }
  }

  function clearSearch() {
    setTerm("")
  }

  return {
    term,
    handleChange,
    handleKeyDown,
    clearSearch,
  }
}
