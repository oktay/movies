"use client"

import { Search, XIcon } from "lucide-react"

import { useSearch } from "@/hooks/useSearch"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export const SearchInput = () => {
  const { term, handleChange, handleKeyDown, clearSearch } = useSearch()

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
