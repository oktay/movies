import { Skeleton } from "@/components/ui/skeleton"

export const ListSkeleton = () => (
  <div className="container space-y-8">
    <div className="md:mb-12 md:mt-6">
      <Skeleton className="mb-2 h-8 rounded-md md:w-40" />
      <Skeleton className="mb-2 h-4 w-1/2 rounded-md md:w-60" />
      <Skeleton className="h-4 w-2/3 rounded-md md:w-96" />
    </div>

    <div className="grid-list">
      {Array.from({ length: 20 }).map((_, i) => (
        <Skeleton key={i} className="aspect-poster w-full rounded-md" />
      ))}
    </div>
  </div>
)
