import { notFound } from "next/navigation"
import { tmdb } from "@/tmdb/api"
import { format } from "@/tmdb/utils"

import { formatValue } from "@/lib/utils"
import { BackdropImage } from "@/components/backdrop-image"
import { DetailView } from "@/components/detail-view"
import { PosterImage } from "@/components/poster-image"

interface DetailLayoutProps {
  children: React.ReactNode
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: DetailLayoutProps) {
  const { name } = await tmdb.person.details({
    id: params.id,
  })

  return {
    title: name,
  }
}

export default async function Detail({ params, children }: DetailLayoutProps) {
  const { id, name, profile_path, biography } = await tmdb.person.details({
    id: params.id,
  })

  if (!id) return notFound()

  return (
    <DetailView.Root>
      <DetailView.Backdrop>
        <BackdropImage alt={name} />
      </DetailView.Backdrop>

      <DetailView.Hero>
        <DetailView.Poster>
          <PosterImage image={profile_path} alt={name} />
        </DetailView.Poster>

        <div>
          <DetailView.Title>{name}</DetailView.Title>
          <DetailView.Overview
            dangerouslySetInnerHTML={{
              __html: formatValue(biography, format.content),
            }}
          />
        </div>
      </DetailView.Hero>

      <DetailView.Content>{children}</DetailView.Content>
    </DetailView.Root>
  )
}
