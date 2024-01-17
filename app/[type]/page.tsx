import MediaDynamicCarousel from "@/components/carousel/dynamic";
import MediaHero from "@/components/media/hero";
import { getRandomMedia, getTrending, lists } from "@/lib/api";

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
