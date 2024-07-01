import MediaDynamicCarousel from "@/components/carousel/dynamic";
import MediaHero from "@/components/media/hero";
import { siteConfig } from "@/config/site";
import { getRandomMedia, getTrending } from "@/lib/api";
import { LISTS } from "@/lib/constants";
import { getMediaCategoryTitle } from "@/lib/utils";
import { Metadata } from "next";

type Props = {
  params: { type: MediaType };
}

export function generateMetadata({ params }: Props): Metadata {
  const title = getMediaCategoryTitle(params.type);
  return {
    title: `${title}${siteConfig.titleSuffix}`,
  };
}

export default async function Type({
  params,
}: Props) {
  const trending = await getTrending(params.type);
  const item = await getRandomMedia(trending.results);
  const list = LISTS[params.type];

  return (
    <main>
      <MediaHero media={item} />
      {list.map((query) => (
        <MediaDynamicCarousel key={query.query} query={query} />
      ))}
    </main>
  );
}
