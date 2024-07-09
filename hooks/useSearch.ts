import { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useDebounce } from "use-debounce"

export const useSearch = () => {
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
      setTerm("")
    }
  }, [pathname])

  useEffect(() => {
    handleSearch(value)
  }, [value]) // eslint-disable-line react-hooks/exhaustive-deps

  function handleSearch(value: string) {
    if (value) {
      router.push(`/search?q=${value}`)
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
    if (event.key === "Enter") {
      handleSearch(value)
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
