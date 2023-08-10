import { getYear } from "@/lib/utils";
import Link from "next/link";

export default function PersonCredit({ credit }: { credit: Credit }) {
  const title = credit.title || credit.name;
  const date = credit.release_date || credit.first_air_date;
  const bgColor =
    credit.media_type === "movie" ? "bg-zinc-900" : "bg-zinc-950/60";

  const episodeCount = credit.episode_count ? (
    credit.episode_count > 1 ? (
      <span className="text-white/30"> ({credit.episode_count} episode) </span>
    ) : (
      <span className="text-white/30"> ({credit.episode_count} episode) </span>
    )
  ) : null;

  const year = date ? getYear(date) : <span>&mdash;</span>;

  const role =
    credit.character || credit.job ? (
      <span className="text-white/60">as {credit.character || credit.job}</span>
    ) : null;

  return (
    <Link
      href={`/${credit.media_type}/detail/${credit.id}`}
      key={credit.id}
      className={`flex py-3 ${bgColor}`}
    >
      <div className="w-20 text-center">{year}</div>
      <div>
        <b className="text-white">{title}</b> {episodeCount} {role}
      </div>
    </Link>
  );
}
