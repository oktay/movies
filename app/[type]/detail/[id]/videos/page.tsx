import { getMedia } from "@/lib/api";
import Videos from "@/components/media/videos";
import { ResolvingMetadata, Metadata } from "next";

type Props = {
  params: { type: MediaType; id: string };
  searchParams: { region: string };
};

export async function generateMetadata(
  _params: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const title = (await parent).title?.absolute;
  return {
    title: `Videos • ${title}`,
  };
}

export default async function DetailVideos({ params }: Props) {
  const media = await getMedia(params.type, params.id);
  return <Videos media={media} />;
}
