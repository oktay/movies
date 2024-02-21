import MediaDynamicGrid from "@/components/grid/dynamic";
import { getListItem, lists } from "@/lib/api";
import { DEFAULT_METADATA } from "@/lib/constants";
import { Metadata } from "next";

type Props = {
  params: { type: MediaType, query: Query };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {

  const queryTitle =  getListItem(params.type, params.query)?.title;

  return {
    title: queryTitle,
    twitter: {
      ...DEFAULT_METADATA.twitter,
      title: `${queryTitle} | ${DEFAULT_METADATA.openGraph.title}`
    },
    openGraph: {
      ...DEFAULT_METADATA.openGraph,
      title: `${queryTitle} | ${DEFAULT_METADATA.openGraph.title}`,
      description: `${DEFAULT_METADATA.openGraph.description}`,
      url: `/${params.type}/${params.query}`,
    },
  };
}

export const revalidate = 60 * 60 * 24; // 24 hours
export default function QueryPage({
  params,
  searchParams,
}: {
  params: { query: Query; type: MediaType };
  searchParams: { page: string };
}) {
  const item = lists[params.type].find((item) => item.query === params.query);

  if (!item) throw new Error("This page could not be found.");

  return (
    <main className="my-global">
      <h1 className="text-2xl px-global mb-5">{item.title}</h1>
      <MediaDynamicGrid query={item} page={searchParams.page} />
    </main>
  );
}
