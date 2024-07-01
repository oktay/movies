import MediaGrid from "@/components/grid/static";
import Pagination from "@/components/pagination";
import { siteConfig } from "@/config/site";
import { getTrending } from "@/lib/api";
import { getMediaCategoryTitle } from "@/lib/utils";
import { Metadata } from "next";

type Props = {
  params: { query: Query; type: MediaType };
  searchParams: { page: string };
}

export function generateMetadata({ params }: Props): Metadata {
  const type = getMediaCategoryTitle(params.type);
  return {
    title: `Trending ${type}${siteConfig.titleSuffix}`,
  }
}

export default async function QueryPage({
  params,
  searchParams,
}: Props) {
  const data = await getTrending(params.type, searchParams.page);
  const title = getMediaCategoryTitle(params.type);

  return (
    <main className="my-global">
      <h1 className="text-2xl px-global mb-5">
        Trending {title}
      </h1>
      <MediaGrid items={data.results} />
      <Pagination page={searchParams.page} totalPages={data.total_pages} />
    </main>
  );
}
