import React from "react"
import Image from "next/image"
import Link from "next/link"
import { pages } from "@/config"
import { tmdb } from "@/tmdb/api"
import { WithImages } from "@/tmdb/api/types"
import { tmdbImage } from "@/tmdb/utils"
import { ArrowRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { MediaBackdrop } from "@/components/media-backdrop"

interface MovieHeroItemProps {
  id: string
  label?: string
  priority?: boolean
}

export const MovieHeroItem: React.FC<MovieHeroItemProps> = async ({
  id,
  label,
  priority,
}) => {
  const item = await tmdb.movie.detail<WithImages>({ id, append: "images" })
  const logo = item.images.logos.find((logo) => logo.iso_639_1 === "en")

  return (
    <div className="h-hero relative" key={item.id}>
      <MediaBackdrop
        image={item.backdrop_path}
        alt={item.title}
        priority={priority}
        className="md:hidden"
        size="w1280"
      />
      <MediaBackdrop
        image={item.backdrop_path}
        alt={item.title}
        priority={priority}
        className="hidden md:block"
      />

      <div className="overlay">
        <div className="mx-auto max-w-3xl space-y-4 p-4 pb-8 text-center md:p-14">
          <Badge className="select-none">{label}</Badge>

          {logo ? (
            <Image
              src={tmdbImage.logo(logo.file_path, "w500")}
              className="mx-auto my-12 w-3/4"
              alt={item.title}
              height={logo.height}
              width={logo.width}
              unoptimized
            />
          ) : (
            <h1 className="line-clamp-2 text-xl font-medium leading-tight tracking-tighter md:text-4xl">
              {item.title}
            </h1>
          )}

          <p className="line-clamp-3 text-sm text-muted-foreground md:text-lg">
            {item.overview}
          </p>

          <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
            <Link
              href={`${pages.movie.root.link}/${item.id}`}
              className={buttonVariants({
                size: "lg",
                variant: "default",
              })}
            >
              Details <ArrowRight className="ml-2 size-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
