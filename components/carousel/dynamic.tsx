import { getQuery } from "@/lib/api";
import MediaCarouselBase from "./_base";
import MediaCarouselItems from "./_items";

export const revalidate = 60 * 60 * 24; // 24 hours
export default async function MediaDynamicCarousel({
  query,
}: {
  query: QueryItem;
}) {
  const data = await getQuery(query);

  return (
    <MediaCarouselBase
      title={query.title}
      link={`/${query.type}/${query.query}`}
    >
      <MediaCarouselItems items={data.results} />
    </MediaCarouselBase>
  );
}
