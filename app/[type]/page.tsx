import MediaDynamicCarousel from "@/components/carousel/dynamic";
import MediaHero from "@/components/media/hero";
import { getRandomMedia, getTrending, lists } from "@/lib/api";
import { DEFAULT_METADATA } from "@/lib/constants";
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
      ...DEFAULT_METADATA.twitter,
      title: `Watch ${type} | ${DEFAULT_METADATA.openGraph.title}`,
    },
    openGraph: {
      ...DEFAULT_METADATA.openGraph,
      title: `Watch ${type} | ${DEFAULT_METADATA.openGraph.title}`,
      url: `/${params.type}`,
    },
  };
}

export const revalidate = 60 * 60 * 24; // 24 hours
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
