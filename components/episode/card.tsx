import { fullDate } from "@/lib/utils";
import Image from "next/image";

export default function EpisodeCard({ episode }: { episode: Episode }) {
  return (
    <div className="flex flex-col">
      <div className="aspect-[16/9] mb-3">
        <Image
          src={`https://image.tmdb.org/t/p/w500${episode.still_path}`}
          alt=""
          width={500}
          height={280}
          unoptimized
        />
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
          <span className="text-sm text-white/60 mt-auto block">
            {fullDate(episode.air_date)}
          </span>
        )}
      </div>
    </div>
  );
}
