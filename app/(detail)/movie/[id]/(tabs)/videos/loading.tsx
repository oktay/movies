import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 20 }).map((_, i) => (
        <Skeleton key={i} className="aspect-video w-full rounded-md" />
      ))}
    </div>
  )
}
