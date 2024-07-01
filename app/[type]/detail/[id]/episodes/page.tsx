import { getMedia } from "@/lib/api";
import MediaEpisodes from "@/components/media/episodes";
import { ResolvingMetadata, Metadata } from "next";

type Props = {
  params: { type: MediaType; id: string };
  searchParams: { season: string };
};

export async function generateMetadata(
  _params: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const title = (await parent).title?.absolute;
  return {
    title: `Episodes • ${title}`,
  };
}

export default async function DetailEpisodes({
  params,
  searchParams,
}: Props) {
  const media = await getMedia(params.type, params.id);
  return <MediaEpisodes media={media} season={searchParams.season} />;
}
