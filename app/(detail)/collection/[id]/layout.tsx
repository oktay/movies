import { notFound } from "next/navigation"
import { siteConfig } from "@/config"
import { tmdb } from "@/tmdb/api"
import { format } from "@/tmdb/utils"

import { MediaBackdrop } from "@/components/media-backdrop"
import { MediaDetailView } from "@/components/media-detail-view"
import { MediaPoster } from "@/components/media-poster"
import { ScrollFixer } from "@/components/scroll-fixer"

interface DetailLayoutProps {
  params: {
    id: string
  }
  children: React.ReactNode
}

export async function generateMetadata({ params }: DetailLayoutProps) {
  const { name } = await tmdb.collection.details({
    id: params.id,
  })

  return {
    title: {
      default: name,
      template: `%s - ${name} - ${siteConfig.name}`,
    },
  }
}

export default async function DetailLayout({
  params,
  children,
}: DetailLayoutProps) {
  const { id, name, overview, backdrop_path, poster_path } =
    await tmdb.collection.details({
      id: params.id,
    })

  if (!id) return notFound()

  return (
    <MediaDetailView.Root>
      <ScrollFixer />

      <MediaDetailView.Backdrop>
        <MediaBackdrop image={backdrop_path} alt={name} priority />
      </MediaDetailView.Backdrop>

      <MediaDetailView.Hero>
        <MediaDetailView.Poster>
          <MediaPoster image={poster_path} alt={name} size="w780" priority />
        </MediaDetailView.Poster>

        <div className="space-y-4">
          <MediaDetailView.Title>{name}</MediaDetailView.Title>

          <MediaDetailView.Overview
            dangerouslySetInnerHTML={{ __html: format.content(overview) }}
          />
        </div>
      </MediaDetailView.Hero>

      <MediaDetailView.Content>
        <div className="mt-4">{children}</div>
      </MediaDetailView.Content>
    </MediaDetailView.Root>
  )
}
