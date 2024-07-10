import Link from "next/link"
import { notFound } from "next/navigation"
import { tmdb } from "@/tmdb/api"
import { format } from "@/tmdb/utils"
import { PlayCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Tabs, TabsList } from "@/components/ui/tabs"
import { Backdrop } from "@/components/backdrop"
import { DetailView } from "@/components/detail-view"
import { Poster } from "@/components/poster"
import { Rating } from "@/components/rating"
import { TabsLink } from "@/components/tabs-link"

interface DetailLayoutProps {
  params: {
    id: string
  }
  children: React.ReactNode
}

export async function generateMetadata({ params }: DetailLayoutProps) {
  const { title } = await tmdb.movie.detail({
    id: params.id,
  })

  return {
    title,
  }
}

export default async function DetailLayout({
  params,
  children,
}: DetailLayoutProps) {
  const {
    id,
    title,
    overview,
    genres,
    vote_average,
    vote_count,
    backdrop_path,
    poster_path,
  } = await tmdb.movie.detail({
    id: params.id,
  })

  if (!id) return notFound()

  return (
    <DetailView.Root>
      <DetailView.Backdrop>
        <Backdrop
          className="hidden md:block"
          image={backdrop_path}
          alt={title}
          priority
        />
        <Poster
          className="md:hidden"
          image={poster_path}
          alt={title}
          size="w780"
          priority
        />
      </DetailView.Backdrop>

      <DetailView.Hero>
        <DetailView.Poster>
          <Poster image={poster_path} alt={title} size="w780" priority />
        </DetailView.Poster>

        <div className="space-y-4">
          <DetailView.Genres>
            <Rating average={vote_average} count={vote_count} />
            {genres?.map((genre) => (
              <DetailView.Genre key={genre.id}>{genre.name}</DetailView.Genre>
            ))}
          </DetailView.Genres>

          <DetailView.Title>{title}</DetailView.Title>
          <DetailView.Overview
            dangerouslySetInnerHTML={{ __html: format.content(overview) }}
          />
          <Link
            href={`/movie/${params.id}/videos`}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <PlayCircle className="mr-2 size-4" /> Watch Videos
          </Link>
        </div>
      </DetailView.Hero>

      <DetailView.Content>
        <Tabs className="mt-12 w-full">
          <div className="max-w-screen scrollbar-hidden -mx-8 overflow-x-scroll px-8 lg:m-0 lg:p-0">
            <TabsList>
              <TabsLink href={`/movie/${id}`}>Overview</TabsLink>
              <TabsLink href={`/movie/${id}/credits`}>Credits</TabsLink>
              <TabsLink href={`/movie/${id}/reviews`}>Reviews</TabsLink>
              <TabsLink href={`/movie/${id}/images`}>Images</TabsLink>
              <TabsLink href={`/movie/${id}/videos`}>Videos</TabsLink>
              <TabsLink href={`/movie/${id}/recommendations`}>
                Recommendations
              </TabsLink>
              <TabsLink href={`/movie/${id}/similar`}>Similar</TabsLink>
            </TabsList>
          </div>
        </Tabs>

        <div className="mt-4">{children}</div>
      </DetailView.Content>
    </DetailView.Root>
  )
}
