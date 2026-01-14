import Link from "next/link"
import { pages } from "@/config"
import { tmdb } from "@/tmdb/api"
import { format } from "@/tmdb/utils"

import { formatValue, joiner } from "@/lib/utils"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table"
import { MovieCollection } from "@/components/movie-collection"

interface DetailProps {
  params: {
    id: string
  }
}

export default async function Detail({ params }: DetailProps) {
  const {
    status,
    release_date,
    runtime,
    budget,
    revenue,
    spoken_languages,
    production_companies,
    belongs_to_collection,
    original_title,
    original_language,
    production_countries,
  } = await tmdb.movie.detail({
    id: params.id,
  })

  const overview = [
    {
      title: "Release Date",
      value: formatValue(release_date, format.date),
    },
    {
      title: "Status",
      value: formatValue(status),
    },
    {
      title: "Original Title",
      value: formatValue(original_title),
    },
    {
      title: "Runtime",
      value: formatValue(runtime, format.runtime),
    },
    {
      title: "Budget",
      value: formatValue(budget, format.currency),
    },
    {
      title: "Revenue",
      value: formatValue(revenue, format.currency),
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
          href={`${pages.movie.discover.link}?with_companies=${id}`}
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
          {overview.map((item) => (
            <TableRow key={item.title}>
              <TableHead className="w-1/5">{item.title}</TableHead>
              <TableCell colSpan={2}>{item.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {belongs_to_collection && (
        <MovieCollection id={belongs_to_collection.id} />
      )}
    </section>
  )
}
