import { cookies } from "next/headers"
import { pages } from "@/config"
import { tmdb } from "@/tmdb/api"
import { SortByType } from "@/tmdb/api/types"

import { filterDiscoverParams } from "@/lib/utils"
import { DiscoverFilters } from "@/components/discover-filters"
import { DiscoverSort } from "@/components/discover-sort"
import { ListPagination } from "@/components/list-pagination"
import { MovieCard } from "@/components/movie-card"

interface ListPageProps {
  searchParams?: Record<string, string>
}

export async function generateMetadata() {
  return {
    title: "Discover Movies",
    description: pages.movie.discover.description,
  }
}

export default async function Discover({ searchParams }: ListPageProps) {
  const region = cookies().get("region")?.value ?? "US"

  const {
    results: movies,
    page: currentPage,
    total_pages: totalPages,
  } = await tmdb.discover.movie({
    watch_region: region,
    page: searchParams?.page,
    sort_by: searchParams?.sort_by as SortByType,
    ...filterDiscoverParams(searchParams),
  })

  const { results: providers } = await tmdb.watchProviders.movie({
    region,
  })

  const { genres } = await tmdb.genres.movie()

  return (
    <div className="container space-y-8">
      <div className="md:mb-12 md:mt-6">
        <h1 className="mb-2 text-2xl font-medium">
          {pages.movie.discover.title}
        </h1>
        <p className="max-w-3xl text-muted-foreground">
          {pages.movie.discover.description}
        </p>
      </div>

      <div className="flex justify-end gap-2">
        <DiscoverFilters type="movie" genres={genres} providers={providers} />
        <DiscoverSort type="movie" />
      </div>

      {movies.length ? (
        <div className="grid-list">
          {movies.map((movie) => (
            <MovieCard key={movie.id} {...movie} />
          ))}
        </div>
      ) : (
        <div className="container flex justify-center pb-[30dvh]">
          <div className="text-center">
            <h1 className="text-2xl">
              No movies found for the selected filters.
            </h1>
            <p className="text-muted-foreground">
              Try removing some of the filters to get more results.
            </p>
          </div>
        </div>
      )}

      {movies?.length > 0 && (
        <ListPagination currentPage={currentPage} totalPages={totalPages} />
      )}
    </div>
  )
}
