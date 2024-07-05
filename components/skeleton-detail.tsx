import { Skeleton } from "@/components/ui/skeleton"
import { DetailView } from "@/components/detail-view"

export default function SkeletonDetail() {
  return (
    <DetailView.Root>
      <DetailView.Backdrop>
        <Skeleton className="size-full rounded-md" />
      </DetailView.Backdrop>

      <DetailView.Hero>
        <DetailView.Poster>
          <Skeleton className="size-full rounded-md" />
        </DetailView.Poster>

        <div>
          <Skeleton className="h-6 w-40 rounded-md" />
          <Skeleton className="mt-2 h-4 w-60 rounded-md" />
          <Skeleton className="mt-4 h-4 w-full rounded-md" />
          <Skeleton className="mt-2 h-4 w-full rounded-md" />
          <Skeleton className="mt-2 h-4 w-full rounded-md" />
        </div>
      </DetailView.Hero>

      <DetailView.Content>
        <Skeleton className="mt-4 h-[30vh] w-full rounded-md" />
      </DetailView.Content>
    </DetailView.Root>
  )
}
