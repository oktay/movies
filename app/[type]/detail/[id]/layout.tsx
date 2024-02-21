import { Suspense } from "react";
import { apiImgUrl, getMedia } from "@/lib/api";
import type { Metadata, ResolvingMetadata } from "next";
import MediaCarousel from "@/components/carousel/static";
import MediaHero from "@/components/media/hero";
import MediaNavbar from "@/components/media/navbar";
import Spinner from "@/components/spinner";
import { DEFAULT_METADATA } from "@/lib/constants";
import { formatTitleMetadata } from "@/lib/utils";

type Props = {
  params: { type: MediaType; id: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {

  // fetch data
  const data = await getMedia(params.type, params.id);
  const formattedMediaTitle = data.name ? formatTitleMetadata(data.name) : formatTitleMetadata(data.title)
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: data.title || data.name,
    description: data.overview,
    twitter: {
      title: formattedMediaTitle,
      description: data.overview,
      images: [`${apiImgUrl}/w1280${data.backdrop_path}`, ...previousImages],
      card: "summary_large_image",
    },
    keywords: data.genres?.map((genre) => genre.name),
    openGraph: {
      ...DEFAULT_METADATA.openGraph,
      title: formattedMediaTitle + " | " + DEFAULT_METADATA.title,
      description: `${data.overview}`,
      url: `/${params.type}/detail/${params.id}`,
      images: [`${apiImgUrl}/w1280${data.backdrop_path}`, ...previousImages],
    },
  };
}

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
