import Image from "next/image";
import Link from "next/link";
import { PiQuestion } from "react-icons/pi";
import Rating from "../media/rating";
import { getYear } from "@/lib/utils";
import { IMAGE_URL } from "@/lib/constants";

export default function CollectionCard({ media }: { media: Media }) {
  return (
    <div className="flex">
      <Link
        href={`/movie/detail/${media.id}`}
        className="relative block w-40 flex-shrink-0"
      >
        <div className="aspect-[2/3]">
          {media.poster_path ? (
            <Image
              className="w-full h-full object-cover p-1 bg-zinc-800/60"
              src={`${IMAGE_URL.POSTER}${media.poster_path}`}
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
      </Link>
      <div className="ml-4 space-y-2">
        <h3 className="line-clamp-1">
          {media.name || media.title}{" "}
          {media.release_date && (
            <span className="text-white/60 text-sm">
              ({getYear(media.release_date)})
            </span>
          )}
        </h3>
        {media.vote_count > 0 && (
          <div className="flex items-center space-x-2 mt-2">
            <Rating average={media.vote_average} />
            <span className="text-xs text-white/60 font-medium">
              {media.vote_average.toFixed(1)}
            </span>
          </div>
        )}
        <p className="line-clamp-6">{media.overview}</p>
      </div>
    </div>
  );
}
