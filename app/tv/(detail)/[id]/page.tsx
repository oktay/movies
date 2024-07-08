import Link from "next/link"
import { tmdb } from "@/tmdb/api"

import { cn, getFullDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { BackdropImage } from "@/components/backdrop-image"

export default async function Detail({ params }: { params: { id: string } }) {
  const {
    first_air_date,
    last_air_date,
    status,
    created_by,
    number_of_seasons,
    number_of_episodes,
    spoken_languages,
    production_companies,
    last_episode_to_air,
  } = await tmdb.tv.detail({
    id: params.id,
  })
  const items = [
    {
      title: "Created By",
      value: created_by.length
        ? created_by.map((person) => person.name).join(", ")
        : "—",
    },
    {
      title: "Status",
      value: status,
    },
    {
      title: "First Air Date",
      value: first_air_date ? getFullDate(first_air_date) : "—",
    },
    {
      title: "Last Air Date",
      value: last_air_date ? getFullDate(last_air_date) : "—",
    },
    {
      title: "Seasons",
      value: number_of_seasons ? `${number_of_seasons}` : "—",
    },
    {
      title: "Episodes",
      value: number_of_episodes ? number_of_episodes : "—",
    },
    {
      title: "Language",
      value: spoken_languages.length
        ? spoken_languages.map((lang) => lang.english_name).join(", ")
        : "—",
    },
    {
      title: "Production Companies",
      value: production_companies
        ? production_companies.map((company) => company.name).join(", ")
        : "—",
    },
  ]

  return (
    <section>
      <div className="grid grid-cols-2 gap-y-12 rounded border p-6 md:grid-cols-4">
        {items.map((item) => (
          <div key={item.title}>
            <h2 className="text-sm font-medium md:text-xl">{item.title}</h2>
            <p className="mt-2 text-xs text-muted-foreground md:text-base">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {last_episode_to_air && (
        <div className="card-border h-hero relative mt-4 w-full">
          <BackdropImage
            image={last_episode_to_air.still_path}
            alt={last_episode_to_air.name}
          />
          <div className="overlay">
            <div className="p-4 md:p-10">
              <Badge className="mb-4 gap-1">
                <span>S{last_episode_to_air.season_number}</span>
                <span>E{last_episode_to_air.episode_number}</span>
              </Badge>

              <h2 className="line-clamp-1 text-lg font-medium md:text-2xl">
                {last_episode_to_air.name}
              </h2>
              <p className="line-clamp-3 max-w-xl text-muted-foreground md:line-clamp-6">
                {last_episode_to_air.overview}
              </p>
              <Link
                href={`/tv/${params.id}/seasons`}
                className={cn(buttonVariants({ variant: "default" }), "mt-4")}
              >
                View Episodes
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
