import Providers from "@/components/media/providers";
import { getMedia } from "@/lib/api";
import { Metadata, ResolvingMetadata } from "next";

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
    title: `Providers for ${title}`,
  };
}

export default async function DetailProviders({ params, searchParams }: Props) {
  const media = await getMedia(params.type, params.id);
  return (
    <Providers media={media} type={params.type} region={searchParams.region} />
  );
}
