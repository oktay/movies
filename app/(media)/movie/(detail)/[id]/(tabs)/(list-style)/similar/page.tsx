import Link from "next/link"
import { tmdb } from "@/tmdb/api"

import { ListPagination } from "@/components/list-pagination"
import { MediaCard } from "@/components/media-card"
import { Poster } from "@/components/poster"

interface DetailSimilarProps {
  params: {
    id: string
  }
  searchParams: {
    page: string
  }
}

export async function generateMetadata({ params }: DetailSimilarProps) {
  const { title } = await tmdb.movie.detail({
    id: params.id,
  })

  return {
    title: `Similar - ${title}`,
  }
}

export default async function DetailSimilar({
  params,
  searchParams,
}: DetailSimilarProps) {
  const {
    results: movies,
    total_pages: totalPages,
    page: currentPage,
  } = await tmdb.movie.similar({
    id: params.id,
    page: searchParams.page,
  })

  if (!movies?.length) {
    return <div className="empty-box">No recommendations</div>
  }

  return (
    <div className="space-y-4">
      <section className="grid-list">
        {movies.map((movie) => (
          <Link key={movie.id} href={`/movie/${movie.id}`} prefetch={false}>
            <MediaCard.Root>
              <Poster image={movie.poster_path} size="w500" alt={movie.title} />
              <MediaCard.Content>
                <MediaCard.Title>{movie.title}</MediaCard.Title>
                <MediaCard.Excerpt>{movie.overview}</MediaCard.Excerpt>
              </MediaCard.Content>
            </MediaCard.Root>
          </Link>
        ))}
      </section>
      <ListPagination totalPages={totalPages} currentPage={currentPage} />
    </div>
  )
}
