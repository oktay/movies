import MediaDynamicGrid from "@/components/grid/dynamic";
import { getListItem, lists } from "@/lib/api";
import { DEFAULT_METADATA, SITE_NAME } from "@/lib/constants";
import { Metadata } from "next";

type Props = {
  params: { type: MediaType, query: Query };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {

  const queryTitle =  getListItem(params.type, params.query)?.title;

  return {
    title: queryTitle,
    twitter: {
      title: `${queryTitle} | ${DEFAULT_METADATA.openGraph.title}`,
      description: DEFAULT_METADATA.description,
      images: DEFAULT_METADATA.openGraph.images,
      card: "summary_large_image",
    },
    openGraph: {
      title: `${queryTitle} | ${DEFAULT_METADATA.openGraph.title}`,
      description: `${DEFAULT_METADATA.openGraph.description}`,
      url: `/${params.type}/${params.query}`,
      type: "website",
      locale: DEFAULT_METADATA.openGraph.locale,
      siteName: SITE_NAME,
      images: DEFAULT_METADATA.openGraph.images,
    },
  };
}

export const revalidate = 60 * 60 * 24; // 24 hours
export const runtime = "edge";
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
