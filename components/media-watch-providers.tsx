import { tmdb } from "@/tmdb/api"
import { WatchLocale } from "@/tmdb/models"
import { Info } from "lucide-react"

import { getRegion } from "@/lib/get-region"
import { getCountryName } from "@/lib/utils"
import { ProviderTable } from "@/components/provider-table"

interface MediaWatchProvidersProps {
  id: string
  type: "movie" | "tv"
}

export const MediaWatchProviders: React.FC<MediaWatchProvidersProps> = async ({
  id,
  type,
}) => {
  const { results } = await tmdb[type].providers({ id })

  const region = getRegion() as keyof WatchLocale
  const country = getCountryName(region)

  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-3">
        <ProviderTable title="Stream" providers={results?.[region]?.flatrate} />
        <ProviderTable title="Buy" providers={results?.[region]?.buy} />
        <ProviderTable title="Rent" providers={results?.[region]?.rent} />
      </div>

      <small className="flex gap-2 rounded-sm border p-4 text-muted-foreground md:items-center">
        <Info className="size-4 shrink-0" />
        <p>
          Currently showing providers for{" "}
          <span className="underline">{country}</span> You can change your
          preferred region in the settings
        </p>
      </small>
    </div>
  )
}
