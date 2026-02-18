import { tmdb } from "@/tmdb/api"

import { MediaCreditsList } from "@/components/media/media-credits-list"

interface DetailCreditsProps {
  params: {
    id: string
  }
}

export const metadata = {
  title: "Credits",
}

export default async function DetailCredits({ params }: DetailCreditsProps) {
  const { cast, crew } = await tmdb.tv.credits({ id: params.id })

  return <MediaCreditsList cast={cast} crew={crew} />
}
