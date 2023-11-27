import Image from "next/image";
import Link from "next/link";
import { PiQuestion } from "react-icons/pi";
import Rating from "./rating";

export default function MediaCard({ media }: { media: Media }) {
  const type = media.name ? "tv" : "movie";

  return (
    <Link href={`/${type}/detail/${media.id}`} className="relative block">
      <div className="aspect-[2/3]">
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
      <div className="mt-2">
        <h3 className="truncate">{media.name || media.title}</h3>
        <div className="flex items-center space-x-2 mt-2">
          <Rating average={media.vote_average} />
          <span className="text-xs text-white/60 font-medium">
            {media.vote_average.toFixed(1)}
          </span>
        </div>
      </div>
    </Link>
  );
}
