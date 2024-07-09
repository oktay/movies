import { LoaderCircle } from "lucide-react"

export default function Loading() {
  return (
    <div className="empty-box h-[30vh]">
      <LoaderCircle className="animate-spin" />
    </div>
  )
}
