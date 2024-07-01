import { getMedia } from "@/lib/api";
import Photos from "@/components/media/photos";
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
    title: `Photos • ${title}`,
  };
}

export default async function DetailVideos({
  params,
}: Props) {
  const media = await getMedia(params.type, params.id);
  return <Photos media={media} />;
}
