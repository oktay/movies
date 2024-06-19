"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { PiCaretDownBold } from "react-icons/pi";
import VideoCard from "../video/card";

export default function Videos({ media }: { media: Media }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const type = searchParams.get("video") || "all";
  const types = [...new Set(media.videos?.results.map((v) => v.type))];
  const videos = media.videos?.results.filter(
    (v) => type === "all" || v.type === type
  );

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    router.replace(`?video=${e.target.value}`, {
      scroll: false,
    });
  }

  return (
    <div className="px-global">
      <div className="relative inline-block mb-4">
        <select
          onChange={handleChange}
          defaultValue={type}
          className="w-36 bg-zinc-800 text-sm pl-3 pr-10 py-2 border-2 border-zinc-700 appearance-none font-medium truncate"
        >
          <option value="all">All</option>
          {types.map((t) => (
            <option value={t} key={t}>
              {t}
            </option>
          ))}
        </select>
        <PiCaretDownBold className="absolute text-lg right-3 top-2.5" />
      </div>

      <span className="text-zinc-500 text-sm font-semibold ml-4">
        {videos?.length} Videos
      </span>

      {media.videos?.results?.length! > 0 && (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
          {videos?.map((video) => (
            <VideoCard video={video} key={video.id} />
          ))}
        </div>
      )}
    </div>
  );
}
