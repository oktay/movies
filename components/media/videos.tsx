import { useRouter, useSearchParams } from "next/navigation";
import VideoCard from "../video/card";

export default function Videos({ media }: { media: Media }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const type = searchParams.get("video") || "all";
  const types = [...new Set(media.videos?.results.map((v) => v.type))];
  const videos = media.videos?.results.filter(
    (v) => type === "all" || v.type === type
  );

  return (
    <div className="px-global">
      <select
        onChange={(e) =>
          router.replace(`?video=${e.target.value}`, {
            scroll: false,
          })
        }
        defaultValue={type}
        className="mb-4 bg-zinc-800 text-sm px-3 py-1"
      >
        <option value="all">All</option>
        {types.map((t) => (
          <option value={t} key={t}>
            {t}
          </option>
        ))}
      </select>

      <span className="text-zinc-500 text-sm font-semibold ml-4">
        {videos?.length} Videos
      </span>

      {media.videos?.results.length && (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
          {videos?.map((video) => (
            <VideoCard video={video} key={video.id} />
          ))}
        </div>
      )}
    </div>
  );
}
