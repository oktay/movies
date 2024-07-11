import { notFound } from "next/navigation"
import { tmdb } from "@/tmdb/api"
import { format } from "@/tmdb/utils"

import { formatValue } from "@/lib/utils"
import { Backdrop } from "@/components/backdrop"
import { DetailView } from "@/components/detail-view"
import { Poster } from "@/components/poster"

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
        <Backdrop alt={name} />
      </DetailView.Backdrop>

      <DetailView.Hero>
        <DetailView.Poster>
          <Poster image={profile_path} alt={name} size="w780" />
        </DetailView.Poster>

        <div className="space-y-4">
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
