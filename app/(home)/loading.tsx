import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mt-8">
      <Skeleton className="h-hero rounded-md" />

      <div className="grid-list mt-12">
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton key={i} className="aspect-poster w-full rounded-md" />
        ))}
      </div>
    </div>
  )
}
