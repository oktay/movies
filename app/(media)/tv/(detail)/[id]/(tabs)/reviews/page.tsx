import { tmdb } from "@/tmdb/api"

import { pluralize } from "@/lib/utils"
import { ListPagination } from "@/components/list-pagination"
import { ReviewCard } from "@/components/review-card"

interface DetailReviewsProps {
  params: {
    id: string
  }
  searchParams: {
    page: string
  }
}

export async function generateMetadata({ params }: DetailReviewsProps) {
  const { name } = await tmdb.tv.detail({
    id: params.id,
  })

  return {
    title: `Reviews - ${name}`,
  }
}
export default async function DetailReviews({
  params,
  searchParams,
}: DetailReviewsProps) {
  const { results, page, total_pages } = await tmdb.tv.reviews({
    id: params.id,
    page: searchParams.page,
  })

  if (!results.length) return <div className="empty-box">No reviews</div>

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-medium">
        <span>Reviews</span>
        <span className="ml-1 align-middle text-xs text-muted-foreground">
          {results.length} {pluralize(results.length, "Review", "Reviews")}
        </span>
      </h2>
      {results.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}

      <ListPagination currentPage={page} totalPages={total_pages} />
    </section>
  )
}
