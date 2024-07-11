import { tmdb } from "@/tmdb/api"
import { RawCombinedCredit } from "@/tmdb/models"

import { filterByDepartment, getDepartments, getUniqueItems } from "@/lib/utils"
import { CreditsTable } from "@/components/credits-table"
import { MovieCard } from "@/components/movie-card"
import { TvCard } from "@/components/tv-card"

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

  const filteredCast = getUniqueItems(
    cast
      .filter((item) => {
        if (item.vote_count <= 0) return false
        if (item.media_type === "tv") return item.episode_count > 8
        return item.order < 10
      })
      .sort((a, b) => {
        const aScore = a.vote_average * (a.vote_count / 1000)
        const bScore = b.vote_average * (b.vote_count / 1000)
        return bScore - aScore
      })
  )

  const filteredCrew = getUniqueItems(
    crew.sort((a, b) => b.vote_count - a.vote_count)
  )

  const highlights = (
    department === "Acting" ? filteredCast : filteredCrew
  ).slice(0, 8) as RawCombinedCredit[]

  return (
    <section>
      <h2 className="mb-4 text-lg font-medium md:text-xl">Known for</h2>
      <div className="grid-list">
        {highlights?.map((item) =>
          item.media_type === "movie" ? (
            <MovieCard key={item.id} {...item} />
          ) : (
            <TvCard key={item.id} {...item} />
          )
        )}
      </div>

      <div className="mt-8 space-y-8">
        {department === "Acting" && (
          <CreditsTable department="Acting" credits={cast} />
        )}

        {getDepartments(crew).map((department) => (
          <CreditsTable
            key={department}
            department={department}
            credits={filterByDepartment(crew, department)}
          />
        ))}
      </div>
    </section>
  )
}
