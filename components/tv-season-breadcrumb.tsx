import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface TvSeasonBreadcrumbProps {
  id: string
  season: number
  seasonName: string
  showName: string
}

export const TvSeasonBreadcrumb: React.FC<TvSeasonBreadcrumbProps> = ({
  id,
  season,
  seasonName,
  showName,
}) => {
  return (
    <div className="flex items-center text-sm">
      <Link
        href={`/tv/${id}`}
        className="text-muted-foreground hover:text-foreground"
      >
        {showName}
      </Link>
      <ChevronRight className="mx-2 size-4 text-muted-foreground" />
      <Link
        href={`/tv/${id}/seasons`}
        className="text-muted-foreground hover:text-foreground"
      >
        Seasons
      </Link>
      <ChevronRight className="mx-2 size-4 text-muted-foreground" />
      <Link href={`/tv/${id}/seasons/${season}`}>{seasonName}</Link>
    </div>
  )
}
