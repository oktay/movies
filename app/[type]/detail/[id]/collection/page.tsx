import CollectionCard from "@/components/collection/card";
import CollectionHero from "@/components/collection/hero";
import { getCollection, getMedia } from "@/lib/api";
import { ResolvingMetadata, Metadata } from "next";

type Props = {
  params: { type: MediaType; id: string };
};

export async function generateMetadata(
  _params: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const title = (await parent).title?.absolute;
  return {
    title: `Collection of ${title}`,
  };
}

export default async function DetailEpisodes({
  params,
}: Props) {
  const media = await getMedia(params.type, params.id);
  const collection = await getCollection(media.belongs_to_collection?.id!);
  return (
    <div className="-mt-6 lg:mt-0">
      <CollectionHero media={collection} />
      <div className="lg:-mt-12 relative px-global container mx-auto grid lg:grid-cols-2 gap-8">
        {collection.parts.map((part, index) => (
          <CollectionCard key={part.id} media={part} />
        ))}
      </div>
    </div>
  );
}
