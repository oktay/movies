import Link from "next/link"
import { notFound } from "next/navigation"
import { tmdb } from "@/tmdb/api"
import { MovieListType } from "@/tmdb/api/types"
import { format } from "@/tmdb/utils"

import { ListPagination } from "@/components/list-pagination"
import { MediaCard } from "@/components/media-card"
import { Poster } from "@/components/poster"
import { Rating } from "@/components/rating"

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
  const {
    results: movies,
    total_pages: totalPages,
    page: currentPage,
  } = await tmdb.movie.list({
    list,
    page,
  })

  if (!movies?.length) {
    return notFound()
  }

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
              <Poster image={movie.poster_path} alt={movie.title} />
              <MediaCard.Content>
                <Rating
                  average={movie.vote_average}
                  count={movie.vote_count}
                  className="mb-2"
                />
                <MediaCard.Title>{movie.title}</MediaCard.Title>
                <MediaCard.Excerpt>
                  {format.year(movie.release_date)}
                </MediaCard.Excerpt>
              </MediaCard.Content>
            </MediaCard.Root>
          </Link>
        ))}
      </div>

      <ListPagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  )
}
