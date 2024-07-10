import { SkeletonReviewCard } from "@/components/review-card"

export default function Loading() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 20 }).map((_, i) => (
        <SkeletonReviewCard key={i} />
      ))}
    </div>
  )
}
