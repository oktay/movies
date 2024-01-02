import { getMedia } from "@/lib/api";
import Photos from "@/components/media/photos";

export const revalidate = 60 * 60 * 24; // 24 hours
export default async function DetailVideos({
  params,
}: {
  params: { type: MediaType; id: string };
}) {
  const media = await getMedia(params.type, params.id);
  return <Photos media={media} />;
}
