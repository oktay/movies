import { SkeletonReview } from "@/components/skeletons"

export default function Loading() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 20 }).map((_, i) => (
        <SkeletonReview key={i} />
      ))}
    </div>
  )
}
