import { MediaWatchProviders } from "@/components/media-watch-providers"

interface DetailWatchProps {
  params: {
    id: string
  }
}

export default function DetailWatch({ params }: DetailWatchProps) {
  return (
    <div className="space-y-6 rounded-md border p-6">
      <div>
        <h2 className="text-lg font-medium">Where to Watch</h2>
        <p className="text-muted-foreground">
          Stream, buy, or rent this movie from the providers below.
        </p>
      </div>

      <MediaWatchProviders id={params.id} type="movie" />
    </div>
  )
}
