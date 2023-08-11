import { getMedia } from "@/lib/api";
import MediaCarousel from "@/components/carousel/static";
import MediaDetails from "@/components/media/details";
import MediaHero from "@/components/media/hero";

export const revalidate = 60 * 60 * 24; // 24 hours
export default async function Detail({
  params,
}: {
  params: { type: MediaType; id: string };
}) {
  const data = await getMedia(params.type, params.id);

  return (
    <main>
      <MediaHero media={data} />
      <MediaDetails media={data} />

      {data.recommendations && data.recommendations.results.length > 0 && (
        <MediaCarousel
          items={data.recommendations.results}
          title="More Like This"
        />
      )}
    </main>
  );
}
