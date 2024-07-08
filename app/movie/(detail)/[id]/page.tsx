import { tmdb } from "@/tmdb/api"

import { getFullDate, getRuntime, numberWithCommas } from "@/lib/utils"
import { Collection } from "@/components/collection"

interface DetailProps {
  params: {
    id: string
  }
}

export default async function Detail({ params }: DetailProps) {
  const {
    id,
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

  const items = [
    {
      title: "Release Date",
      value: release_date ? getFullDate(release_date) : "—",
    },
    {
      title: "Runtime",
      value: runtime ? getRuntime(runtime) : "—",
    },
    {
      title: "Budget",
      value: budget ? `$${numberWithCommas(budget)}` : "—",
    },
    {
      title: "Revenue",
      value: revenue ? `$${numberWithCommas(revenue)}` : "—",
    },
    {
      title: "Language",
      value: spoken_languages?.length
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
            <h2 className="font-medium md:text-xl">{item.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground md:text-base">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {belongs_to_collection && <Collection id={belongs_to_collection.id} />}
    </section>
  )
}
