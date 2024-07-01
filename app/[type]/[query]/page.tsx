import MediaDynamicGrid from "@/components/grid/dynamic";
import { siteConfig } from "@/config/site";
import { getListItem } from "@/lib/utils";
import { Metadata } from "next";

type Props = {
  params: { query: Query; type: MediaType };
  searchParams: { page: string };
}

export function generateMetadata({ params }: Props): Metadata {
  const query = getListItem(params.type, params.query);
  return {
    title: `${query?.title}${siteConfig.titleSuffix}`,
  };

}

export default function QueryPage({
  params,
  searchParams,
}: Props) {
  const query = getListItem(params.type, params.query);

  if (!query) throw new Error("This page could not be found.");

  return (
    <main className="my-global">
      <h1 className="text-2xl px-global mb-5">{query.title}</h1>
      <MediaDynamicGrid query={query} page={searchParams.page} />
    </main>
  );
}
