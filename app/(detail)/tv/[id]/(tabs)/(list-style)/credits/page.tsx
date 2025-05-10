import Link from "next/link"
import { tmdb } from "@/tmdb/api"
import { Info } from "lucide-react"

import { Alert, AlertTitle } from "@/components/ui/alert"
import { SeparatorLabel } from "@/components/ui/separator-label"
import { MediaCastCard } from "@/components/media-cast-card"
import { MediaCrewCard } from "@/components/media-crew-card"

interface DetailCreditsProps {
  params: {
    id: string
  }
}

export const metadata = {
  title: "Credits",
}

export default async function DetailCredits({
  params,
}: {
  params: { id: string }
}) {
  const { cast, crew } = await tmdb.tv.credits({ id: params.id })

  return (
    <section className="space-y-12">
      {cast.length > 0 ? (
        <div className="grid-list">
          {cast.map((cast) => (
            <MediaCastCard key={cast.credit_id} {...cast} />
          ))}
        </div>
      ) : (
        <div className="empty-box">No cast</div>
      )}

      <div className="flex items-center">
        <SeparatorLabel className="flex-1">Crew</SeparatorLabel>

        <Alert className="ml-12 w-auto ">
          <Info className="size-4" />
          <AlertTitle className="text-muted-foreground">
            You can view the seasonal cast, guest stars and crew in the{" "}
            <Link href="seasons" className="font-medium underline">
              Season
            </Link>{" "}
            details page.
          </AlertTitle>
        </Alert>
      </div>

      {crew.length > 0 ? (
        <div className="grid-list">
          {crew.map((crew) => (
            <MediaCrewCard key={crew.credit_id} {...crew} />
          ))}
        </div>
      ) : (
        <div className="empty-box">No crew</div>
      )}
    </section>
  )
}
