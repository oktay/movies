import CollectionCard from "@/components/collection/card";
import CollectionHero from "@/components/collection/hero";
import { getCollection, getMedia } from "@/lib/api";

export const revalidate = 60 * 60 * 24; // 24 hours
export const runtime = "edge";
export default async function DetailEpisodes({
  params,
}: {
  params: { type: MediaType; id: string };
}) {
  const media = await getMedia(params.type, params.id);
  const collection = await getCollection(media.belongs_to_collection?.id!);
  return (
    <div className="-mt-6 lg:mt-0">
      <CollectionHero media={collection} />
      <div className="mt-8 space-y-4 px-global container mx-auto">
        {collection.parts.map((part) => (
          <CollectionCard key={part.id} media={part} />
        ))}
      </div>
    </div>
  );
}
