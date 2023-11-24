"use client";

import { useRef } from "react";
import { PiCaretLeft, PiCaretRight } from "react-icons/pi";
import MediaCard from "../media/card";
import PersonCard from "../person/card";

export default function MediaCarouselItems({
  items,
  type,
}: {
  items: Media[] | Person[];
  type?: "tv" | "movie" | "person";
}) {
  const scrollContainer = useRef<HTMLUListElement>(null);

  function scrollLeft() {
    scrollContainer?.current?.scrollBy({
      left: -window.innerWidth,
      behavior: "smooth",
    });
  }

  function scrollRight() {
    scrollContainer?.current?.scrollBy({
      left: window.innerWidth,
      behavior: "smooth",
    });
  }

  return (
    <div className="relative group">
      <ul
        className="carousel overflow-x-scroll whitespace-nowrap snap-mandatory snap-x scroll-p-4 pl-4 md:scroll-p-10 md:pl-10 lg:scroll-p-12 lg:pl-12"
        ref={scrollContainer}
      >
        {items.map((item) => (
          <li
            key={item.id}
            className="w-40 lg:w-60 inline-block mr-2 snap-start whitespace-normal"
          >
            {item.media_type === "person" || type === "person" ? (
              <PersonCard person={item as Person} />
            ) : (
              <MediaCard media={item as Media} />
            )}
          </li>
        ))}
      </ul>
      <button
        className="hidden lg:flex absolute top-0 left-0 bottom-0 opacity-0 bg-black/50 p-3 text-3xl items-center hover:opacity-100 transition"
        onClick={scrollLeft}
      >
        <PiCaretLeft />
        <span className="sr-only">Scroll left</span>
      </button>
      <button
        className="hidden lg:flex absolute top-0 right-0 bottom-0 opacity-0 bg-black/50 p-3 text-3xl items-center hover:opacity-100 transition"
        onClick={scrollRight}
      >
        <PiCaretRight />
        <span className="sr-only">Scroll right</span>
      </button>
    </div>
  );
}
