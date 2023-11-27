import { fullDate } from "@/lib/utils";
import { PiQuestion } from "react-icons/pi";
import Image from "next/image";

export default function EpisodeCard({ episode }: { episode: Episode }) {
  return (
    <div>
      <div className="aspect-[16/9] mb-3">
        {episode.still_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/w500${episode.still_path}`}
            className="p-1 bg-zinc-800"
            alt=""
            width={500}
            height={280}
            unoptimized
          />
        ) : (
          <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
            <PiQuestion className="text-4xl text-zinc-500" />
          </div>
        )}
      </div>
      <div className="h-full flex flex-col">
        <h3 className="mb-3">
          <span className="text-blue-500">
            E
            {episode.episode_number < 10
              ? "0" + episode.episode_number
              : episode.episode_number}
          </span>{" "}
          {episode.name}
        </h3>
        <p className="text-sm">{episode.overview}</p>
        {episode.air_date && (
          <span className="text-sm text-white/60 mt-2">
            {fullDate(episode.air_date)}
          </span>
        )}
      </div>
    </div>
  );
}
