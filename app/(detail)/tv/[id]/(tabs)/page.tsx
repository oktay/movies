import Link from "next/link"
import { tmdb } from "@/tmdb/api"
import { format } from "@/tmdb/utils"

import { cn, formatValue, joiner, pad } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table"
import { MediaBackdrop } from "@/components/media-backdrop"

export default async function Detail({ params }: { params: { id: string } }) {
  const {
    first_air_date,
    last_air_date,
    status,
    original_name,
    created_by,
    number_of_seasons,
    number_of_episodes,
    spoken_languages,
    production_companies,
    networks,
    episode_run_time,
    production_countries,
    original_language,
    last_episode_to_air: lastEpisode,
  } = await tmdb.tv.detail({
    id: params.id,
  })

  const items = [
    {
      title: "Created By",
      value: created_by.map(({ id, name }) => (
        <Link
          key={id}
          href={`/person/${id}`}
          className="mr-1 border-b-2 transition hover:text-foreground"
        >
          {name}
        </Link>
      )),
    },
    {
      title: "Status",
      value: formatValue(status),
    },
    {
      title: "Original Name",
      value: formatValue(original_name),
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
      title: "Episode Runtime",
      value: formatValue(episode_run_time, format.runtime),
    },
    {
      title: "Language",
      value: joiner(spoken_languages, "english_name"),
    },
    {
      title: "Original Language",
      value: formatValue(original_language, format.country),
    },
    {
      title: "Production Countries",
      value: joiner(production_countries, "name"),
    },
    {
      title: "Production Companies",
      value: production_companies.map(({ id, name }) => (
        <Link
          key={id}
          href={`/tv/discover?with_companies=${id}`}
          className="mr-1 border-b-2 transition hover:text-foreground"
        >
          {name}
        </Link>
      )),
    },
    {
      title: "Networks",
      value: networks.map(({ id, name }) => (
        <Link
          key={id}
          href={`/tv/discover?with_networks=${id}`}
          className="mr-1 border-b-2 transition hover:text-foreground"
        >
          {name}
        </Link>
      )),
    },
  ]

  return (
    <section className="space-y-4">
      <Table>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.title}>
              <TableHead className="w-1/5">{item.title}</TableHead>
              <TableCell colSpan={2}>{item.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {lastEpisode && (
        <div className="h-hero relative w-full">
          <MediaBackdrop
            image={lastEpisode.still_path}
            alt={lastEpisode.name}
          />
          <div className="overlay">
            <div className="p-4 md:p-10">
              <Badge className="mb-4 gap-1">
                <span>S{pad(lastEpisode.season_number)}</span>
                <span>E{pad(lastEpisode.episode_number)}</span>
              </Badge>

              <h2 className="line-clamp-1 text-lg font-medium md:text-2xl">
                {lastEpisode.name}
              </h2>
              <p className="line-clamp-3 max-w-xl text-muted-foreground md:line-clamp-6">
                {lastEpisode.overview}
              </p>
              <Link
                href={`/tv/${params.id}/seasons/${lastEpisode.season_number}`}
                className={cn(buttonVariants({ variant: "default" }), "mt-4")}
                prefetch={false}
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
