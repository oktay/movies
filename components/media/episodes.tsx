import { getMediaEpisodes } from "@/lib/api";
import EpisodeGrid from "../episode/grid";
import EpisodeCard from "../episode/card";
import SeasonSelect from "../episode/select";

export const revalidate = 60 * 60 * 24; // 24 hours
export default async function MediaEpisodes({
  media,
  season = "1",
}: {
  media: Media;
  season?: string | null;
}) {
  const data = await getMediaEpisodes(media.id, season ? +season : 1);

  return (
    <div className="px-global">
      <div className="flex items-center mb-4">
        <SeasonSelect count={media.number_of_seasons || 1} />
        <p className="text-zinc-500 text-sm font-semibold ml-4">
          {data.episodes.length} Episodes
        </p>
      </div>

      <EpisodeGrid>
        {data.episodes.map((episode) => (
          <EpisodeCard key={episode.id} episode={episode} />
        ))}
      </EpisodeGrid>
    </div>
  );
}
