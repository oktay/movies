import { MediaWatchProviders } from "@/components/media-watch-providers"

interface DetailWatchProps {
  params: {
    id: string
  }
}

export const metadata = {
  title: "Watch",
}

export default function DetailWatch({ params }: DetailWatchProps) {
  return <MediaWatchProviders id={params.id} type="tv" />
}
