import { SkeletonReviewCard } from "@/components/user/user-review-card"

export default function ReviewsSkeleton() {
  return (
    <div className="space-y-8">
      {Array.from({ length: 20 }).map((_, i) => (
        <SkeletonReviewCard key={i} />
      ))}
    </div>
  )
}
