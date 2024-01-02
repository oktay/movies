import {
  directors,
  fullDate,
  fullLang,
  numberWithCommas,
  runtime,
} from "@/lib/utils";
import { PiQuestion } from "react-icons/pi";
import Image from "next/image";
import MediaCarousel from "../carousel/static";
import Link from "next/link";

export default function MediaOverview({ media }: { media: Media }) {
  const type = media.name ? "tv" : "movie";

  const details = [
    {
      title: "First Aired",
      value: media.first_air_date ? fullDate(media.first_air_date) : null,
      type: "tv",
    },
    {
      title: "Last Aired",
      value: media.last_air_date ? fullDate(media.last_air_date) : null,
      type: "tv",
    },
    {
      title: "Runtime",
      value: media.episode_run_time?.length
        ? runtime(media.episode_run_time[0])
        : null,
      type: "tv",
    },
    {
      title: "Released",
      value: media.release_date ? fullDate(media.release_date) : null,
      type: "movie",
    },
    {
      title: "Seasons",
      value: media.number_of_seasons,
      type: "tv",
    },
    {
      title: "Episodes",
      value: media.number_of_episodes,
      type: "tv",
    },
    {
      title: "Runtime",
      value: media.runtime ? runtime(media.runtime) : null,
      type: "movie",
    },
    {
      title: "Director",
      value: media.credits?.crew
        ? directors(media)?.map((p) => (
            <Link
              key={p.id}
              href={`/person/detail/${p.id}`}
              className="text-blue-500 underline"
            >
              {p.name}
            </Link>
          ))
        : null,
      type: "movie",
    },
    {
      title: "Budget",
      value: media.budget ? "$" + numberWithCommas(media.budget) : null,
      type: "movie",
    },
    {
      title: "Revenue",
      value: media.revenue ? "$" + numberWithCommas(media.revenue) : null,
      type: "movie",
    },
    {
      title: "Creator",
      value:
        media.created_by?.length > 0 &&
        media.created_by?.map((p) => (
          <Link
            key={p.id}
            href={`/person/detail/${p.id}`}
            className="text-blue-500 underline"
          >
            {p.name}
          </Link>
        )),
      type: "tv",
    },
    {
      title: "Genre",
      value: media.genres?.map((g) => (
        <Link
          key={g.id}
          href={`/${type}/genre/${g.id}`}
          className="text-blue-500 underline"
        >
          {g.name}
        </Link>
      )),
      type: "tv&movie",
    },
    {
      title: "Status",
      value: media.status,
      type: "tv",
    },
    {
      title: "Language",
      value: fullLang(media.original_language),
      type: "tv&movie",
    },
    {
      title: "Network",
      value: media.networks?.map((network) => network.name).join(", "),
      type: "tv",
    },
    {
      title: "Production",
      value: media.production_companies
        ?.map((company) => company.name)
        .join(", "),
      type: "tv&movie",
    },
  ];

  return (
    <>
      <div className="flex px-global pb-6">
        <div className="aspect-[2/3] max-w-[350px] flex-shrink-0 mr-12 hidden lg:block">
          {media.poster_path ? (
            <Image
              className="w-full h-full object-cover p-1 bg-zinc-800"
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
        <div>
          <h2 className="text-2xl mb-4">Storyline</h2>
          <p className="mb-8 max-w-3xl">{media.overview}</p>

          <div>
            {details.map((detail) =>
              detail.type.includes(type)
                ? detail.value && (
                    <div className="flex mt-2" key={detail.title}>
                      <div className="min-w-[120px]">{detail.title}</div>
                      <div className="flex flex-wrap gap-2">{detail.value}</div>
                    </div>
                  )
                : null
            )}
          </div>
        </div>
      </div>

      {media.credits && media.credits?.cast?.length > 0 && (
        <MediaCarousel items={media.credits.cast} title="Cast" type="person" />
      )}
    </>
  );
}
