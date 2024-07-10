"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import {
  Movie,
  MovieWithMediaType,
  TvShow,
  TvShowWithMediaType,
} from "@/tmdb/models"
import { format } from "@/tmdb/utils"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { MediaCard } from "@/components/media-card"
import { Poster } from "@/components/poster"
import { Rating } from "@/components/rating"

interface TrendCarouselProps {
  title?: string
  link?: string
  items: MovieWithMediaType[] | TvShowWithMediaType[]
  type: "movie" | "tv"
}

export const TrendCarousel: React.FC<TrendCarouselProps> = ({
  title,
  link,
  items,
  type,
}) => {
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

  function getYear(item: MovieWithMediaType | TvShowWithMediaType) {
    const isMovie = item.media_type === "movie"
    const date = isMovie ? item.release_date : item.first_air_date
    return format.year(date)
  }

  return (
    <Carousel opts={{ dragFree: true }} setApi={setApi}>
      <div className="mb-4 flex items-center">
        <h2 className="font-medium md:text-lg">{title}</h2>

        {link && (
          <Link
            href={link}
            className={cn(
              buttonVariants({ size: "sm", variant: "outline" }),
              "ml-4 text-primary"
            )}
            prefetch={false}
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

          <Button onClick={previousSlide} size="sm" variant="outline">
            <ArrowLeft className="size-3" />
            <span className="sr-only">Previous</span>
          </Button>
          <Button onClick={nextSlide} size="sm" variant="outline">
            <ArrowRight className="size-3" />
            <span className="sr-only">Next</span>
          </Button>
        </div>
      </div>

      <CarouselContent>
        {items.map((item) => (
          <CarouselItem
            key={item.id}
            className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
          >
            <Link href={`/${type}/${item.id}`} prefetch={false}>
              <MediaCard.Root>
                <Poster image={item.poster_path} alt={getTitle(item)} />
                <MediaCard.Content>
                  <Rating
                    average={item.vote_average}
                    count={item.vote_count}
                    className="mb-2"
                  />
                  <MediaCard.Title>{getTitle(item)}</MediaCard.Title>
                  <MediaCard.Excerpt>{getYear(item)}</MediaCard.Excerpt>
                </MediaCard.Content>
              </MediaCard.Root>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
