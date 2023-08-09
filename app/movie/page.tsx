import MediaDynamicCarousel from "@/components/carousel/dynamic";
import MediaHero from "@/components/media/hero";
import { getRandomMedia, getTrending, lists } from "@/lib/api";

export default async function Movie() {
  const trending = await getTrending("movie");
  const item = await getRandomMedia(trending.results);

  return (
    <main>
      <MediaHero media={item} />
      {lists.movie.map((query) => (
        <MediaDynamicCarousel key={query.query} query={query} />
      ))}
    </main>
  );
}
