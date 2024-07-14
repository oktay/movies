import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="grid-list">
      {Array.from({ length: 20 }).map((_, i) => (
        <Skeleton key={i} className="aspect-poster w-full rounded-md" />
      ))}
    </div>
  )
}
