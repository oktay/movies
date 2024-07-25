"use client"

import { regions } from "@/config"
import { useProviders } from "@/hooks"
import { WatchLocale } from "@/tmdb/models"
import ReactCountryFlag from "react-country-flag"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ProviderTable } from "@/components/provider-table"

interface MediaWatchProvidersProps {
  providers: WatchLocale
}

export const MediaWatchProviders: React.FC<MediaWatchProvidersProps> = ({
  providers,
}) => {
  const { results, region, setRegion } = useProviders(providers)

  return (
    <div className="space-y-4">
      <Select value={region} onValueChange={setRegion}>
        <SelectTrigger className="max-w-56">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          {regions.map((region) => (
            <SelectItem key={region.iso_3166_1} value={region.iso_3166_1}>
              <ReactCountryFlag
                countryCode={region.iso_3166_1}
                className="pr-2 text-xl"
                svg
              />
              {region.english_name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="grid gap-4 lg:grid-cols-3">
        <ProviderTable title="Stream" providers={results.flatrate} />
        <ProviderTable title="Buy" providers={results.buy} />
        <ProviderTable title="Rent" providers={results.rent} />
      </div>
    </div>
  )
}
