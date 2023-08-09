import { getRandomMedia, getTrending, lists } from "@/lib/api";
import MediaDynamicCarousel from "@/components/carousel/dynamic";
import MediaHero from "@/components/media/hero";

export default async function TV() {
  const trending = await getTrending("tv");
  const item = await getRandomMedia(trending.results);

  return (
    <main>
      <MediaHero media={item} />
      {lists.tv.map((query) => (
        <MediaDynamicCarousel key={query.query} query={query} />
      ))}
    </main>
  );
}
