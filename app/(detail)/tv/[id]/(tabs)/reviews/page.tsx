import { tmdb } from "@/tmdb/api"

import { ListPagination } from "@/components/list-pagination"
import { UserReviewCard } from "@/components/user-review-card"

interface DetailReviewsProps {
  params: {
    id: string
  }
  searchParams: {
    page: string
  }
}

export const metadata = {
  title: "Reviews",
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
    <section className="space-y-8">
      {results.map((review) => (
        <UserReviewCard key={review.id} review={review} />
      ))}

      <ListPagination currentPage={page} totalPages={total_pages} />
    </section>
  )
}
