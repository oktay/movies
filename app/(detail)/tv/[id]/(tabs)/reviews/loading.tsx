import { SkeletonReviewCard } from "@/components/user-review-card"

export default function Loading() {
  return (
    <div className="space-y-8">
      {Array.from({ length: 20 }).map((_, i) => (
        <SkeletonReviewCard key={i} />
      ))}
    </div>
  )
}
