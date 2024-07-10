import Link from "next/link"
import { tmdb } from "@/tmdb/api"
import { RawCombinedCredit, RawTvSerieCredit } from "@/tmdb/models"

import { Badge } from "@/components/ui/badge"
import { MediaCard } from "@/components/media-card"
import { Poster } from "@/components/poster"
import { Rating } from "@/components/rating"

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

  let combinedCredits: RawCombinedCredit[] = []

  if (department === "Acting") {
    combinedCredits = cast.sort((a, b) => a.order - b.order)
  } else if (department === "Directing") {
    combinedCredits = crew?.filter((item) => item.department === "Directing")
  } else if (department === "Production") {
    combinedCredits = crew?.filter((item) => item.department === "Production")
  } else if (department === "Writing" || department === "Creator") {
    combinedCredits = crew?.filter((item) => item.department === "Writing")
  }

  combinedCredits = combinedCredits.filter(
    (result) => combinedCredits.filter((r) => r.id === result.id).length === 1
  )

  combinedCredits = combinedCredits.sort((a, b) =>
    a.vote_count > b.vote_count ? -1 : 1
  )

  return (
    <section>
      <h2 className="text-lg font-medium md:text-xl">Known for</h2>
      <div className="grid-list mt-6">
        {combinedCredits?.map((item) => (
          <Link
            key={item.id}
            href={`/${item.media_type}/${item.id}`}
            prefetch={false}
          >
            <MediaCard.Root>
              <Poster image={item.poster_path} alt={item.title} size="w500" />
              <MediaCard.Content>
                <div className="mb-2 flex gap-2">
                  <Rating average={item.vote_average} count={item.vote_count} />
                  <Badge variant="outline" className="border-foreground">
                    {item.media_type === "tv" ? "TV Show" : "Movie"}
                  </Badge>
                </div>
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
