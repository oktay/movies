import { tmdb } from "@/tmdb/api"
import { format } from "@/tmdb/utils"

import { formatValue, joiner } from "@/lib/utils"
import { Collection } from "@/components/collection"

interface DetailProps {
  params: {
    id: string
  }
}

export default async function Detail({ params }: DetailProps) {
  const {
    release_date,
    runtime,
    budget,
    revenue,
    spoken_languages,
    production_companies,
    belongs_to_collection,
  } = await tmdb.movie.detail({
    id: params.id,
  })

  const overview = [
    {
      title: "Release Date",
      value: formatValue(release_date, format.date),
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
      title: "Production Companies",
      value: joiner(production_companies, "name"),
    },
  ]

  return (
    <section>
      <div className="grid grid-cols-2 gap-y-12 rounded border p-6 md:grid-cols-4">
        {overview.map((item) => (
          <div key={item.title}>
            <h2 className="font-medium md:text-xl">{item.title}</h2>
            <p className="mt-2 line-clamp-2 text-sm text-muted-foreground md:text-base">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {belongs_to_collection && <Collection id={belongs_to_collection.id} />}
    </section>
  )
}
