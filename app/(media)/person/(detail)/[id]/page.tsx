import Link from "next/link"
import { tmdb } from "@/tmdb/api"
import { RawCombinedCredit, RawTvSerieCredit } from "@/tmdb/models"

import { MediaCard } from "@/components/media-card"
import { Poster } from "@/components/poster"

interface DetailProps {
  params: {
    id: string
  }
}

export default async function Detail({ params }: DetailProps) {
  const { known_for_department: department } = await tmdb.person.details({
    id: params.id,
  })

  const { cast, crew } = await tmdb.person.combinedCredits({
    id: params.id,
  })

  let results: RawCombinedCredit[] = []

  if (department === "Acting") {
    results = cast
  } else if (department === "Directing") {
    results = crew?.filter((item) => item.department === "Directing")
  } else if (department === "Production") {
    results = crew?.filter((item) => item.department === "Production")
  } else if (department === "Writing" || department === "Creator") {
    results = crew?.filter((item) => item.department === "Writing")
  }

  results = results.filter(
    (result) => results.filter((r) => r.id === result.id).length === 1
  )

  results = results.sort((a, b) => (a.vote_count > b.vote_count ? -1 : 1))

  return (
    <section>
      <h2 className="text-lg font-medium md:text-xl">Known for</h2>
      <div className="grid-list mt-6">
        {results?.map((item) => (
          <Link key={item.id} href={`/${item.media_type}/${item.id}`}>
            <MediaCard.Root>
              <Poster image={item.poster_path} alt={item.title} />
              <MediaCard.Content>
                <MediaCard.Title>
                  {item.title || (item as RawTvSerieCredit).name}
                </MediaCard.Title>
                <MediaCard.Excerpt>{item.overview}</MediaCard.Excerpt>
              </MediaCard.Content>
            </MediaCard.Root>
          </Link>
        ))}
      </div>
    </section>
  )
}
