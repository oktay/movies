import Link from "next/link"
import { notFound } from "next/navigation"
import { tmdb } from "@/tmdb/api"
import { MovieListType } from "@/tmdb/api/types"

import { ListPagination } from "@/components/list-pagination"

import { MediaCard } from "./media-card"
import { PosterImage } from "./poster-image"

export const MovieList = async ({
  list,
  page,
  title,
  description,
}: {
  list: MovieListType
  page: string
  title?: string
  description?: string
}) => {
  const data = await tmdb.movie.list({
    list,
    page,
  })

  if (!data.results) {
    return notFound()
  }

  const currentPage = data.page
  const totalPages = data.total_pages > 500 ? 500 : data.total_pages

  return (
    <div className="container py-8">
      {(title || description) && (
        <div className="mb-8">
          {title && <h1 className="mb-2 text-2xl font-medium">{title}</h1>}
          {description && (
            <p className="max-w-3xl text-muted-foreground">{description}</p>
          )}
        </div>
      )}

      <div className="space-y-8">
        <div className="grid-list">
          {data.results.map((movie) => (
            <Link
              href={`/movie/${movie.id}`}
              key={movie.id}
              className="w-full"
              prefetch={false}
            >
              <MediaCard.Root>
                <PosterImage
                  image={movie.poster_path}
                  alt={movie.title}
                  size="w500"
                />
                <MediaCard.Content>
                  <MediaCard.Title>{movie.title}</MediaCard.Title>
                  <MediaCard.Excerpt>{movie.overview}</MediaCard.Excerpt>
                </MediaCard.Content>
              </MediaCard.Root>
            </Link>
          ))}
        </div>

        <ListPagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </div>
  )
}
