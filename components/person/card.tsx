import Image from "next/image";
import { PiQuestion } from "react-icons/pi";

export default function PersonCard({ person }: { person: Person }) {
  return (
    <div className="relative aspect-[2/3]">
      {person.profile_path ? (
        <Image
          className="w-full h-full object-cover"
          src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
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
      <div className="mt-2">
        <h3 className="line-clamp-1">{person.name}</h3>
      </div>
    </div>
  );
}
