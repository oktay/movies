import { redirect } from "next/navigation"
import { tmdb } from "@/tmdb/api"
import { BadgeHelp } from "lucide-react"

import { ListPagination } from "@/components/list-pagination"
import { SearchResultCard } from "@/components/search-result-card"

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
    <div className="container h-full">
      <div className="mt-6 space-y-4">
        <div>
          <h1 className="text-lg font-medium">Search results for:</h1>
          <p className="text-muted-foreground">{searchParams.q}</p>
        </div>

        <div className="grid-list">
          {results?.map((result) => {
            return <SearchResultCard key={result.id} media={result} />
          })}
        </div>

        {!results?.length && (
          <div className="grid h-[55vh] place-items-center rounded-md border bg-background">
            <div className="space-y-4 text-center text-muted-foreground">
              <BadgeHelp className="mx-auto size-12" />
              <p>No results found</p>
            </div>
          </div>
        )}

        <ListPagination currentPage={page} totalPages={total_pages} />
      </div>
    </div>
  )
}
