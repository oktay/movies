import { Suspense } from "react";
import { getMedia } from "@/lib/api";
import MediaCarousel from "@/components/carousel/static";
import MediaHero from "@/components/media/hero";
import MediaNavbar from "@/components/media/navbar";
import Spinner from "@/components/spinner";

export const revalidate = 60 * 60 * 24; // 24 hours
export const runtime = "edge";
export default async function DetailLayout({
  params,
  children,
}: {
  params: { type: MediaType; id: string };
  children: React.ReactNode;
}) {
  const data = await getMedia(params.type, params.id);

  return (
    <main>
      <MediaHero media={data} />

      <div>
        <MediaNavbar media={data} />

        <div className="my-6 lg:my-0">
          <Suspense
            fallback={
              <div className="h-96 flex items-center justify-center text-4xl">
                <Spinner />
              </div>
            }
          >
            {children}
          </Suspense>
        </div>
      </div>

      {data.recommendations && data.recommendations.results.length > 0 && (
        <MediaCarousel
          items={data.recommendations.results}
          title="More Like This"
        />
      )}
    </main>
  );
}
