"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Search, XIcon } from "lucide-react"
import { useDebounce } from "use-debounce"

import { Button } from "./ui/button"
import { Input } from "./ui/input"

export const SearchInput = () => {
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

  return (
    <div className="relative flex items-center">
      <Search className="absolute left-4 size-4 text-muted-foreground" />
      <Input
        name="q"
        type="text"
        value={term}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Search..."
        className="pl-10 text-base"
      />
      {term && (
        <Button
          size="icon"
          variant="ghost"
          className="absolute right-0"
          onClick={clearSearch}
        >
          <XIcon className="size-3" />
        </Button>
      )}
    </div>
  )
}
