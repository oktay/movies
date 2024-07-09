import { redirect } from "next/navigation"
import { tmdb } from "@/tmdb/api"

import { ListPagination } from "@/components/list-pagination"
import { SearchItem } from "@/components/search-item"

interface SearchProps {
  searchParams: {
    q: string
    page: string
  }
}

export async function generateMetadata({ searchParams }: SearchProps) {
  return {
    title: `Search results for: ${searchParams.q}`,
  }
}

export default async function Search({ searchParams }: SearchProps) {
  if (!searchParams.q) {
    return redirect("/")
  }

  const { results, page, total_pages } = await tmdb.search.multi({
    query: searchParams.q,
    page: searchParams.page,
  })

  return (
    <div className="container">
      <div className="mt-6 space-y-4">
        <div>
          <h1 className="text-lg font-medium">Search results for:</h1>
          <p className="text-muted-foreground">{searchParams.q}</p>
        </div>
        <div className="grid-list">
          {results?.map((result) => {
            return <SearchItem key={result.id} media={result} />
          })}
        </div>
        <ListPagination currentPage={page} totalPages={total_pages} />
      </div>
    </div>
  )
}
