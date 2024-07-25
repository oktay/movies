import { useState } from "react"
import { WatchLocale } from "@/tmdb/models"

export const useProviders = (providers: WatchLocale) => {
  const [region, setRegion] = useState<keyof WatchLocale>("US")

  const results = {
    flatrate: providers[region]?.flatrate ?? [],
    buy: providers[region]?.buy ?? [],
    rent: providers[region]?.rent ?? [],
  }

  function handleChange(value: string) {
    setRegion(value as keyof WatchLocale)
  }

  return {
    region,
    results,
    setRegion: handleChange,
  }
}
