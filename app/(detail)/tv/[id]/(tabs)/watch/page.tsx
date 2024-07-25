import { tmdb } from "@/tmdb/api"

import { MediaWatchProviders } from "@/components/media-watch-providers"

interface DetailWatchProps {
  params: {
    id: string
  }
}

export default async function DetailWatch({ params }: DetailWatchProps) {
  const { results: providers } = await tmdb.tv.providers({ id: params.id })

  return (
    <div className="space-y-6 rounded-md border p-6">
      <div>
        <h2 className="text-lg font-medium">Where to Watch</h2>
        <p className="text-muted-foreground">
          Select a region to see where you can watch this TV show
        </p>
      </div>

      <MediaWatchProviders providers={providers} />
    </div>
  )
}
