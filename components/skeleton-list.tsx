import { Skeleton } from "@/components/ui/skeleton"

export default function SkeletonList() {
  return (
    <div className="container mt-8">
      <Skeleton className="h-6 w-40 rounded-md" />
      <Skeleton className="mt-2 h-4 w-60 rounded-md" />
      <Skeleton className="mt-4 h-4 w-96 rounded-md" />

      <div className="grid-list mt-8">
        {Array.from({ length: 20 }).map((_, i) => (
          <Skeleton key={i} className="aspect-poster w-full rounded-md" />
        ))}
      </div>
    </div>
  )
}
