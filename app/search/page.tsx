import Link from "next/link"
import { redirect } from "next/navigation"
import { tmdb } from "@/tmdb/api"

import { ListPagination } from "@/components/list-pagination"
import { MediaCard } from "@/components/media-card"
import { PosterImage } from "@/components/poster-image"

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
            return (
              <Link key={result.id} href={`/${result.media_type}/${result.id}`}>
                <MediaCard.Root>
                  <PosterImage
                    image={
                      result.media_type === "person"
                        ? result.profile_path
                        : result.poster_path
                    }
                    alt={
                      result.media_type === "movie" ? result.title : result.name
                    }
                  />

                  <MediaCard.Content>
                    <MediaCard.Title>
                      {result.media_type === "movie"
                        ? result.title
                        : result.name}
                    </MediaCard.Title>
                  </MediaCard.Content>
                </MediaCard.Root>
              </Link>
            )
          })}
        </div>
        <ListPagination currentPage={page} totalPages={total_pages} />
      </div>
    </div>
  )
}
