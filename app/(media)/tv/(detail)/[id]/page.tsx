import Link from "next/link"
import { tmdb } from "@/tmdb/api"
import { format } from "@/tmdb/utils"

import { cn, formatValue, joiner } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Backdrop } from "@/components/backdrop"

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
      value: joiner(created_by, "name"),
    },
    {
      title: "Status",
      value: formatValue(status),
    },
    {
      title: "First Air Date",
      value: formatValue(first_air_date, format.date),
    },
    {
      title: "Last Air Date",
      value: formatValue(last_air_date, format.date),
    },
    {
      title: "Seasons",
      value: formatValue(number_of_seasons),
    },
    {
      title: "Episodes",
      value: formatValue(number_of_episodes),
    },
    {
      title: "Language",
      value: joiner(spoken_languages, "english_name"),
    },
    {
      title: "Production Companies",
      value: joiner(production_companies, "name"),
    },
  ]

  return (
    <section>
      <div className="grid grid-cols-2 gap-y-12 rounded border p-6 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.title}>
            <h2 className="font-medium md:text-xl">{item.title}</h2>
            <p className="mt-2 line-clamp-2 text-sm text-muted-foreground md:text-base">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {last_episode_to_air && (
        <div className="h-hero card relative mt-4 w-full">
          <Backdrop
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
