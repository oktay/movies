import { notFound } from "next/navigation"
import { tmdb } from "@/tmdb/api"
import { TvListType } from "@/tmdb/api/types"

import { ListPagination } from "@/components/list-pagination"
import { TvCard } from "@/components/tv-card"

interface TvListProps {
  list: TvListType
  page: string
  title: string
  description?: string
}

export const TvList: React.FC<TvListProps> = async ({
  list,
  page,
  title,
  description,
}) => {
  const {
    results: tvShows,
    total_pages: totalPages,
    page: currentPage,
  } = await tmdb.tv.list({
    list: list,
    page,
  })

  if (!tvShows?.length) {
    return notFound()
  }

  return (
    <div className="container space-y-8">
      <div className="md:mb-24 md:mt-12">
        <h1 className="mb-2 text-2xl font-medium">{title}</h1>
        <p className="max-w-3xl text-muted-foreground">{description}</p>
      </div>

      <div className="grid-list">
        {tvShows?.map((tvShow) => (
          <TvCard key={tvShow.id} {...tvShow} />
        ))}
      </div>

      <ListPagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  )
}
