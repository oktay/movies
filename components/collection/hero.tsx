import Image from "next/image";
import { PiQuestion } from "react-icons/pi";

export default function CollectionHero({ media }: { media: CollectionResult }) {
  return (
    <div className="relative xl:aspect-[3/1] border-b border-zinc-800">
      {media.backdrop_path ? (
        <Image
          className="w-full h-full object-cover"
          src={`https://image.tmdb.org/t/p/w1280${media.backdrop_path}`}
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
      <div className="absolute inset-0 flex items-end lg:items-center container mx-auto px-global">
        <div className="aspect-[2/3] max-w-xs hidden 2xl:block">
          {media.poster_path ? (
            <Image
              className="w-full h-full object-cover p-1 bg-zinc-800/60"
              src={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
              width={500}
              height={750}
              alt=""
              unoptimized
            />
          ) : (
            <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
              <PiQuestion className="text-4xl text-zinc-500" />
            </div>
          )}
        </div>
        <div className="px-global h-full flex flex-col justify-center">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl md:text-5xl md:leading-tight lg:text-6xl line-clamp-2 lg:leading-tight flex items-center gap-2">
              {media.name}
              <span className="text-white/60 md:text-xl lg:text-2xl">
                {media.parts.length && <span>({media.parts.length})</span>}
              </span>
            </h1>
            <p className="mt-2 sm:mt-4 md:mt-6 max-w-3xl tex-lg md:text-xl text-gray-300 line-clamp-3 mb-8 lg:mb-0">
              {media.overview}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
