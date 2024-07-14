"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import {
  MovieWithMediaType,
  PersonWithMediaType,
  TvShowWithMediaType,
} from "@/tmdb/models"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { MovieCard } from "@/components/movie-card"
import { PersonCard } from "@/components/person-card"
import { TvCard } from "@/components/tv-card"

interface TrendCarouselProps {
  title?: string
  link?: string
  items: MovieWithMediaType[] | TvShowWithMediaType[] | PersonWithMediaType[]
  type: "movie" | "tv" | "person"
}

export const TrendCarousel: React.FC<TrendCarouselProps> = ({
  title,
  link,
  items,
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

  return (
    <Carousel opts={{ dragFree: true }} setApi={setApi}>
      <div className="mb-4 flex items-center justify-between gap-4 md:justify-start">
        <h2 className="font-medium md:text-lg">{title}</h2>

        {link && (
          <Link
            href={link}
            className={cn(buttonVariants({ size: "sm", variant: "outline" }))}
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
            {item.media_type === "tv" ? (
              <TvCard key={item.id} {...item} />
            ) : item.media_type === "person" ? (
              <PersonCard key={item.id} {...item} />
            ) : (
              <MovieCard key={item.id} {...item} />
            )}
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
