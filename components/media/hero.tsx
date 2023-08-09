import Image from "next/image";

export default function MediaHero({ media }: { media: Media }) {
  return (
    <div className="relative aspect-[3/2] lg:aspect-[16/6]">
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
      <div className="absolute inset-0 bg-zinc-700 mix-blend-multiply" />
      <div className="absolute inset-0 flex items-center">
        <div className="px-8 sm:px-24">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              {media.title || media.name}
            </h1>
            <p className="mt-6 max-w-3xl text-xl text-gray-300 line-clamp-3">
              {media.overview}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
