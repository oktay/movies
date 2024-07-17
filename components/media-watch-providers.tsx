"use client"

import { useState } from "react"
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
  regions: { english_name: string; iso_3166_1: string }[]
}

export const MediaWatchProviders: React.FC<MediaWatchProvidersProps> = ({
  providers,
  regions,
}) => {
  const [region, setRegion] = useState<keyof WatchLocale>("US")

  const { flatrate, buy, rent } = providers[region] ?? {}

  function handleChange(value: string) {
    setRegion(value as keyof WatchLocale)
  }

  return (
    <div className="space-y-6">
      <div className="relative rounded-md border bg-accent p-6 md:p-8">
        <div className="overlay" />

        <div className="relative">
          <div className="mb-6">
            <h2 className="text-lg font-medium tracking-tighter md:text-2xl">
              Where to Watch
            </h2>
            <p className="text-muted-foreground">
              Select a region to see where you can watch this movie or TV show
            </p>
          </div>

          <Select value={region} onValueChange={handleChange}>
            <SelectTrigger className="col-span-2 max-w-56 md:col-span-1">
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
        </div>

        <div className="col-span-2 mt-12 grid gap-4 md:grid-cols-3">
          <ProviderTable title="Stream" providers={flatrate} />
          <ProviderTable title="Buy" providers={buy} />
          <ProviderTable title="Rent" providers={rent} />
        </div>
      </div>
    </div>
  )
}
