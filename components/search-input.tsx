"use client"

import { useEffect, useRef } from "react"
import { Search, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { useSearch } from "@/hooks/useSearch"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export const SearchInput = () => {
  const ref = useRef<HTMLInputElement>(null)
  const { term, handleChange, handleKeyDown, clearSearch } = useSearch()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        clearSearch()
      }

      if (
        (event.key === "k" && event.ctrlKey) ||
        (event.key === "k" && event.metaKey)
      ) {
        event.preventDefault()
        ref.current?.focus()
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  })

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
        className="px-10 text-base"
        ref={ref}
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
      <span
        className={cn(
          "pointer-events-none absolute right-2 hidden rounded-md bg-accent px-2 py-1 text-xs text-muted-foreground",
          !term && "lg:block"
        )}
      >
        Ctrl/⌘ + K
      </span>
    </div>
  )
}
