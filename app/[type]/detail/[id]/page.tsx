import { Suspense } from "react";

import { getMedia } from "@/lib/api";
import MediaCarousel from "@/components/carousel/static";
import MediaDetails from "@/components/media/details";
import MediaHero from "@/components/media/hero";
import Spinner from "@/components/spinner";
import MediaEpisodes from "@/components/media/episodes";
import MediaOverview from "@/components/media/overview";
import Photos from "@/components/media/photos";
import Videos from "@/components/media/videos";

export const revalidate = 60 * 60 * 24; // 24 hours
export default async function Detail({
  params,
  searchParams,
}: {
  params: { type: MediaType; id: string };
  searchParams: Record<'season', 'string'>;
}) {
  const data = await getMedia(params.type, params.id);

  return (
    <main>
      <MediaHero media={data} />
      <MediaDetails
        media={data}
        tabComponents={{
          overview: <MediaOverview media={data} />,
          episodes: (
            <Suspense
              fallback={
                <div className="h-96 flex items-center justify-center text-4xl">
                  <Spinner />
                </div>
              }
            >
              <MediaEpisodes media={data} season={searchParams.season} />
            </Suspense>
          ),
          videos: <Videos media={data} />,
          photos: <Photos media={data} />,
        }}
      />

      {data.recommendations && data.recommendations.results.length > 0 && (
        <MediaCarousel
          items={data.recommendations.results}
          title="More Like This"
        />
      )}
    </main>
  );
}
