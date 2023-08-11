import MediaGrid from "@/components/grid/static";
import Pagination from "@/components/pagination";
import { getTrending } from "@/lib/api";

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
