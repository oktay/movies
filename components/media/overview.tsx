import { fullDate, fullLang, numberWithCommas, runtime } from "@/lib/utils";
import Image from "next/image";
import { PiQuestion } from "react-icons/pi";
import MediaCarousel from "../carousel/static";

export default function MediaOverview({ media }: { media: Media }) {
  const details = [
    {
      title: "First Aired",
      value: media.first_air_date ? fullDate(media.first_air_date) : null,
    },
    {
      title: "Last Aired",
      value: media.last_air_date ? fullDate(media.last_air_date) : null,
    },
    {
      title: "Runtime",
      value: media.episode_run_time ? runtime(media.episode_run_time[0]) : null,
    },
    {
      title: "Released",
      value: media.release_date ? fullDate(media.release_date) : null,
    },
    {
      title: "Seasons",
      value: media.number_of_seasons,
    },
    {
      title: "Episodes",
      value: media.number_of_episodes,
    },
    {
      title: "Runtime",
      value: media.runtime ? runtime(media.runtime) : null,
    },
    {
      title: "Budget",
      value: media.budget ? "$" + numberWithCommas(media.budget) : null,
    },
    {
      title: "Revenue",
      value: media.revenue ? "$" + numberWithCommas(media.revenue) : null,
    },
    {
      title: "Status",
      value: media.status,
    },
    {
      title: "Language",
      value: fullLang(media.original_language),
    },
    {
      title: "Network",
      value: media.networks?.map((network) => network.name).join(", "),
    },
    {
      title: "Production",
      value: media.production_companies
        ?.map((company) => company.name)
        .join(", "),
    },
  ];

  return (
    <>
      <div className="flex px-global my-6 lg:my-12">
        <div className="aspect-[2/3] max-w-[400px] flex-shrink-0 mr-12 hidden lg:block">
          {media.poster_path ? (
            <Image
              className="w-full h-full object-cover"
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
            {details.map(
              (detail) =>
                detail.value && (
                  <div className="flex mt-4" key={detail.title}>
                    <div className="min-w-[120px]">{detail.title}</div>
                    <div className="w-fill">{detail.value}</div>
                  </div>
                )
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
