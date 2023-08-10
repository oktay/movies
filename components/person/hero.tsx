import { formatContent } from "@/lib/utils";
import { PiQuestion } from "react-icons/pi";
import Image from "next/image";

export default function PersonHero({ person }: { person: Person }) {
  return (
    <div className="flex items-start px-global">
      <div className="aspect-[2/3] max-w-[350px] flex-shrink-0 mr-12 hidden lg:block">
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
      </div>
      <div>
        <h2 className="text-2xl mb-4">{person.name}</h2>
        {person.biography && (
          <div
            className="mb-8 max-w-3xl space-y-4"
            dangerouslySetInnerHTML={{
              __html: formatContent(person.biography),
            }}
          />
        )}
      </div>
    </div>
  );
}
