import Link from "next/link"
import { notFound } from "next/navigation"
import { tmdb } from "@/tmdb/api"
import { MovieListType } from "@/tmdb/api/types"

import { ListPagination } from "@/components/list-pagination"
import { MediaCard } from "@/components/media-card"
import { Poster } from "@/components/poster"

interface MovieListProps {
  list: MovieListType
  page: string
  title?: string
  description?: string
}

export const MovieList: React.FC<MovieListProps> = async ({
  list,
  page,
  title,
  description,
}) => {
  const { results: movies, total_pages } = await tmdb.movie.list({
    list,
    page,
  })

  if (!movies) {
    return notFound()
  }

  const currentPage = parseInt(page)
  const totalPages = total_pages > 500 ? 500 : total_pages

  return (
    <div className="container space-y-8 py-8">
      <div>
        <h1 className="mb-2 text-2xl font-medium">{title}</h1>
        <p className="max-w-3xl text-muted-foreground">{description}</p>
      </div>

      <div className="grid-list">
        {movies.map((movie) => (
          <Link
            href={`/movie/${movie.id}`}
            key={movie.id}
            className="w-full"
            prefetch={false}
          >
            <MediaCard.Root>
              <Poster image={movie.poster_path} alt={movie.title} size="w500" />
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
  )
}
