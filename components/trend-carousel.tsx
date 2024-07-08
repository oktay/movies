"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Movie, TvShow } from "@/tmdb/models"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"

import { MediaCard } from "./media-card"
import { PosterImage } from "./poster-image"
import { Badge } from "./ui/badge"
import { Button, buttonVariants } from "./ui/button"
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "./ui/carousel"

type TrendCarouselProps = {
  title?: string
  link?: string
  items: Movie[] | TvShow[]
  type: "movie" | "tv"
}

export const TrendCarousel = ({
  title,
  link,
  items,
  type,
}: TrendCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>()
  const [total, setTotal] = useState(0)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) return

    setTotal(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  function nextSlide() {
    api?.scrollNext()
  }

  function previousSlide() {
    api?.scrollPrev()
  }

  function getTitle(item: Movie | TvShow) {
    return (item as Movie).title || (item as TvShow).name
  }

  return (
    <Carousel opts={{ dragFree: true }} setApi={setApi}>
      <div className="mb-4 flex items-center">
        <h2 className="font-medium md:text-lg">{title}</h2>

        {link && (
          <Link
            href={link}
            className={cn(
              buttonVariants({
                size: "sm",
                variant: "outline",
              }),
              "ml-4 h-8 text-xs text-primary"
            )}
          >
            Explore more
          </Link>
        )}

        <div className="ml-auto hidden items-center gap-2 md:flex">
          <p className="mr-4 text-xs text-muted-foreground">
            <span className="font-bold text-foreground">{current}</span>
            <span> / </span>
            <span>{total}</span>
          </p>

          <Button
            onClick={previousSlide}
            size="icon"
            variant="outline"
            className="!size-8 rounded-full"
          >
            <ArrowLeft className="size-3" />
          </Button>
          <Button
            onClick={nextSlide}
            size="icon"
            variant="outline"
            className="!size-8 rounded-full"
          >
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>

      <CarouselContent>
        {items.map((item) => (
          <CarouselItem
            key={item.id}
            className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
          >
            <Link href={`/${type}/${item.id}`}>
              <MediaCard.Root>
                <PosterImage
                  image={item.poster_path}
                  alt={getTitle(item)}
                  size="w500"
                />
                <MediaCard.Content>
                  <Badge className="mb-2">{item.vote_average.toFixed(1)}</Badge>
                  <MediaCard.Title>{getTitle(item)}</MediaCard.Title>
                  <MediaCard.Excerpt>{item.overview}</MediaCard.Excerpt>
                </MediaCard.Content>
              </MediaCard.Root>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
