import { tmdb } from "@/tmdb/api"

import { MediaWatchProviders } from "@/components/media-watch-providers"

interface DetailWatchProps {
  params: {
    id: string
  }
}

export default async function DetailWatch({ params }: DetailWatchProps) {
  const { results: providers } = await tmdb.movie.providers({ id: params.id })
  const { results: regions } = await tmdb.watchProviders.regions()

  return <MediaWatchProviders providers={providers} regions={regions} />
}
