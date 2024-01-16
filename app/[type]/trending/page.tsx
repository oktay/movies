import MediaGrid from "@/components/grid/static";
import Pagination from "@/components/pagination";
import { getTrending } from "@/lib/api";
import { DEFAULT_METADATA, SITE_NAME} from "@/lib/constants";
import { Metadata } from "next";

type Props = {
  params: { type: MediaType };
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const type = params.type === "movie" ? "Trending Movies" : "Trending Tv Shows";

  return {
    title: `${type}`,
    twitter: {
      title: `${type} | ${DEFAULT_METADATA.title}`,
      description: DEFAULT_METADATA.description,
      images: DEFAULT_METADATA.openGraph.images,
      card: "summary_large_image",
    },
    openGraph: {
      title: `${type} | ${DEFAULT_METADATA.openGraph.title}`,
      description: `${DEFAULT_METADATA.openGraph.description}`,
      url: `/${params.type}/trending`,
      type: "website",
      locale: "en_US",
      siteName: SITE_NAME,
      images: DEFAULT_METADATA.openGraph.images,
    },
  };
}

export const revalidate = 60 * 60 * 24; // 24 hours
export default async function QueryPage({
  params,
  searchParams,
}: {
  params: { query: Query; type: MediaType };
  searchParams: { page: string };
}) {
  const data = await getTrending(params.type, searchParams.page);

  return (
    <main className="my-global">
      <h1 className="text-2xl px-global mb-5">
        Trending {params.type === "tv" ? "TV Shows" : "Movies"}
      </h1>
      <MediaGrid items={data.results} />
      <Pagination page={searchParams.page} totalPages={data.total_pages} />
    </main>
  );
}
