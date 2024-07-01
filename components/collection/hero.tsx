"use client";

import { useEffect } from "react";
import { IMAGE_URL } from "@/lib/constants";
import Image from "next/image";

export default function CollectionHero({ media }: { media: CollectionResult }) {
  useEffect(() => {
    const navbar = document?.querySelector("#navbar");
    navbar?.scrollIntoView({ behavior: "smooth" });
  }, [])

  return (
    <div className="relative aspect-square md:aspect-[3/2] xl:aspect-[4/1]">
      {media.backdrop_path ? (
        <Image
          className="w-full h-full object-cover"
          src={`${IMAGE_URL.BACKDROP}${media.backdrop_path}`}
          alt=""
          width={1280}
          height={720}
          loading="eager"
          priority
          unoptimized
        />
      ) : (
        <div className="w-full h-full bg-zinc-900" />
      )}
  
      <div className="absolute inset-0 bg-zinc-700 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent via-60% to-[#111] " />

      <div className="absolute inset-0 flex items-end justify-between lg:items-center container mx-auto px-global">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl md:text-5xl md:leading-tight lg:text-6xl line-clamp-2 lg:leading-tight">
            {media.name}
            <span className="text-white/60 text-sm md:text-xl lg:text-2xl align-middle ml-2">
              {media.parts.length && <span>({media.parts.length})</span>}
            </span>
          </h1>
          <p className="mt-2 sm:mt-4 md:mt-6 max-w-3xl tex-lg md:text-xl text-gray-300 line-clamp-3 mb-8 lg:mb-0">
            {media.overview}
          </p>
        </div>
      </div>
    </div>
  );
}
