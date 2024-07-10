import { Skeleton } from "@/components/ui/skeleton"
import { DetailView } from "@/components/detail-view"

export const SkeletonList = () => (
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

export const SkeletonDetail = () => (
  <DetailView.Root>
    <DetailView.Backdrop>
      <Skeleton className="size-full rounded-md" />
    </DetailView.Backdrop>

    <DetailView.Hero>
      <DetailView.Poster>
        <Skeleton className="size-full rounded-md" />
      </DetailView.Poster>

      <div className="space-y-4">
        <Skeleton className="h-6 w-40 rounded-md" />
        <Skeleton className="h-4 w-60 rounded-md" />
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-4 w-full rounded-md" />
      </div>
    </DetailView.Hero>

    <DetailView.Content>
      <Skeleton className="mt-4 h-[30vh] w-full rounded-md" />
    </DetailView.Content>
  </DetailView.Root>
)

export const SkeletonReview = () => (
  <div className="grid grid-cols-[auto,1fr] items-center gap-2 md:items-start md:gap-x-4">
    <div className="relative aspect-square w-10 md:row-span-2 md:w-12">
      <Skeleton className="size-full rounded-full" />
    </div>
    <div className="flex items-center justify-between">
      <h3 className="flex">
        <Skeleton className="h-6 w-40 rounded-md" />
      </h3>
      <div className="flex flex-col items-end gap-2 md:flex-row md:items-center">
        <Skeleton className="h-4 w-24 rounded-md" />
        <Skeleton className="h-4 w-24 rounded-md" />
      </div>
    </div>
    <div className="col-span-2 space-y-2 rounded-md border p-4 text-sm leading-relaxed md:col-span-1 md:col-start-2">
      <Skeleton className="h-4 w-full rounded-md" />
      <Skeleton className="h-4 w-full rounded-md" />
      <Skeleton className="h-4 w-full rounded-md" />
    </div>
  </div>
)
