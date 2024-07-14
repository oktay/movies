import { tmdb } from "@/tmdb/api"
import { RawCombinedCredit } from "@/tmdb/models"
import { format } from "@/tmdb/utils"

import {
  filterByDepartment,
  formatValue,
  getDepartments,
  getRandomItems,
  getUniqueItems,
} from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { MediaBackdrop } from "@/components/media-backdrop"
import { MediaDetailView } from "@/components/media-detail-view"
import { MediaPoster } from "@/components/media-poster"
import { MovieCard } from "@/components/movie-card"
import { PersonCreditsTable } from "@/components/person-credits-table"
import { TvCard } from "@/components/tv-card"

interface DetailProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: DetailProps) {
  const { name } = await tmdb.person.details({
    id: params.id,
  })

  return {
    title: name,
  }
}

export default async function Detail({ params }: DetailProps) {
  const {
    name,
    profile_path,
    biography,
    birthday,
    place_of_birth,
    known_for_department: department,
  } = await tmdb.person.details({
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

  const [hero] = getRandomItems(highlights, 1)

  return (
    <MediaDetailView.Root>
      <MediaDetailView.Backdrop>
        <MediaBackdrop
          className="hidden md:block"
          image={hero?.backdrop_path}
          alt={name}
        />
        <MediaPoster className="md:hidden" image={profile_path} alt={name} />

        {hero?.backdrop_path && (
          <Badge
            variant="secondary"
            className="absolute right-4 top-4 hidden select-none md:block"
          >
            An image from {hero.media_type === "tv" ? hero.name : hero.title},
            one of the productions that also features {name}.
          </Badge>
        )}
      </MediaDetailView.Backdrop>

      <MediaDetailView.Hero>
        <MediaDetailView.Poster>
          <MediaPoster image={profile_path} alt={name} size="w780" />
        </MediaDetailView.Poster>

        <div className="space-y-4">
          <MediaDetailView.Title>{name}</MediaDetailView.Title>
          <MediaDetailView.Overview>
            <p>
              {[format.date(birthday), place_of_birth]
                .filter(Boolean)
                .join(" — ")}
            </p>
          </MediaDetailView.Overview>
          <MediaDetailView.Overview
            dangerouslySetInnerHTML={{
              __html: formatValue(biography, format.content),
            }}
          />
        </div>
      </MediaDetailView.Hero>

      <MediaDetailView.Content>
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
              <PersonCreditsTable department="Acting" credits={cast} />
            )}

            {getDepartments(crew).map((department) => (
              <PersonCreditsTable
                key={department}
                department={department}
                credits={filterByDepartment(crew, department)}
              />
            ))}
          </div>
        </section>
      </MediaDetailView.Content>
    </MediaDetailView.Root>
  )
}
