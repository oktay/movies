import Image from "next/image";
import { getAvailableRegions, getProviders } from "@/lib/api";
import { PiQuestion } from "react-icons/pi";
import RegionSelect from "../provider/select";
import ProviderGrid from "../provider/grid";

export default async function Providers({
  media,
  type,
  region,
}: {
  media: Media;
  type: MediaType;
  region: string | null;
}) {
  const regions = await getAvailableRegions();
  const data = await getProviders(type, media.id);
  const selectedRegion = data.results[region as string];

  return (
    <div className="flex items-start px-global pb-6">
      <div className="aspect-[2/3] max-w-[350px] flex-shrink-0 mr-12 hidden lg:block">
        {media.poster_path ? (
          <Image
            className="w-full h-full object-cover p-1 bg-zinc-800"
            src={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
            width={500}
            height={750}
            alt={media.name || media.title}
            unoptimized
          />
        ) : (
          <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
            <PiQuestion className="text-4xl text-zinc-500" />
          </div>
        )}
      </div>
      <div>
        <h2 className="text-2xl mb-4 flex items-center gap-4">
          <Image
            src="https://www.themoviedb.org/assets/2/v4/logos/justwatch-c2e58adf5809b6871db650fb74b43db2b8f3637fe3709262572553fa056d8d0a.svg"
            alt="JustWatch"
            width={120}
            height={80}
            unoptimized
          />

          <RegionSelect regions={regions.results} />
        </h2>
        <p className="mb-8 max-w-3xl">
          JustWatch makes it easy to find out where you can legally watch your
          favorite movies & TV shows online. Visit{" "}
          <a
            href="https://www.justwatch.com/"
            target="_blank"
            rel="noreferrer noopener"
            className="underline"
          >
            JustWatch
          </a>{" "}
          for more information.
        </p>
        <div className="max-w-5xl space-y-4">
          <ProviderGrid
            title="Stream"
            list={selectedRegion?.flatrate}
            link={selectedRegion?.link}
          />
          <ProviderGrid
            title="Buy"
            list={selectedRegion?.buy}
            link={selectedRegion?.link}
          />
          <ProviderGrid
            title="Rent"
            list={selectedRegion?.rent}
            link={selectedRegion?.link}
          />
        </div>
      </div>
    </div>
  );
}
