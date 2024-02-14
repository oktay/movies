import MediaDynamicCarousel from "@/components/carousel/dynamic";
import MediaHero from "@/components/media/hero";
import { getRandomMedia, getTrending, lists } from "@/lib/api";
import { DEFAULT_METADATA, SITE_NAME } from "@/lib/constants";
import { Metadata } from "next";

type Props = {
  params: { type: MediaType};
};

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {

  const type = params.type === 'movie' ? 'Movies' : "Tv"

  return {
    title: `Watch ${type}`,
    twitter: {
      title: `Watch ${type} | ${DEFAULT_METADATA.openGraph.title}`,
      description: DEFAULT_METADATA.description,
      images: DEFAULT_METADATA.openGraph.images,
      card: "summary_large_image",
    },
    openGraph: {
      title: `Watch ${type} | ${DEFAULT_METADATA.openGraph.title}`,
      description: `${DEFAULT_METADATA.openGraph.description}`,
      url: `/${params.type}`,
      type: "website",
      locale: DEFAULT_METADATA.openGraph.locale,
      siteName: SITE_NAME,
      images: DEFAULT_METADATA.openGraph.images,
    },
  };
}

export const revalidate = 60 * 60 * 24; // 24 hours
export const runtime = "edge";
export default async function Type({
  params,
}: {
  params: { type: MediaType };
}) {
  const trending = await getTrending(params.type);
  const item = await getRandomMedia(trending.results);

  return (
    <main>
      <MediaHero media={item} />
      {lists[params.type].map((query) => (
        <MediaDynamicCarousel key={query.query} query={query} />
      ))}
    </main>
  );
}
