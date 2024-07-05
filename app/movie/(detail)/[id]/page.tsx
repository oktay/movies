import { tmdb } from "@/tmdb/api"

import { getFullDate, getRuntime, numberWithCommas } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { BackdropImage } from "@/components/backdrop-image"
import { CollectionDialog } from "@/components/collection-dialog"

export default async function Detail({
  params,
}: {
  params: {
    id: string
  }
}) {
  const {
    release_date,
    runtime,
    budget,
    revenue,
    spoken_languages,
    production_companies,
    belongs_to_collection: collection,
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
    <div>
      <div className="grid grid-cols-2 gap-y-12 rounded border p-6 md:grid-cols-4">
        {items.map((item) => (
          <div key={item.value}>
            <h2 className="font-medium md:text-xl">{item.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground md:text-base">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {collection && (
        <div className="card-border h-hero relative mt-4 w-full">
          <BackdropImage
            image={collection.backdrop_path}
            alt={collection.name}
          />
          <div className="overlay">
            <div className="p-10">
              <p className="line-clamp-3 text-xs text-muted-foreground md:text-lg">
                Part of
              </p>
              <h2 className="line-clamp-1 text-lg font-medium md:text-2xl">
                {collection.name}
              </h2>
              <CollectionDialog id={collection.id}>
                <Button className="mt-4">View Collection</Button>
              </CollectionDialog>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
