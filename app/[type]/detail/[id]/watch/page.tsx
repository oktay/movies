import Providers from "@/components/media/providers";
import { getMedia } from "@/lib/api";
import { getRegion } from "@/lib/utils";

export const revalidate = 60 * 60 * 24; // 24 hours
export default async function DetailProviders({
  params,
  searchParams,
}: {
  params: { type: MediaType; id: string };
  searchParams: { region: string };
}) {
  const media = await getMedia(params.type, params.id);
  return (
    <Providers
      media={media}
      type={params.type}
      region={searchParams.region || getRegion() || "US"}
    />
  );
}
