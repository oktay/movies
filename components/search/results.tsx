import { getSearch } from "@/lib/api";
import MediaGrid from "@/components/grid/static";
import Pagination from "../pagination";

export default async function SearchResults({
  query,
  page = "1",
}: {
  query: string;
  page?: string;
}) {
  const data = await getSearch(query, page);

  return (
    <>
      {query && data.results.length === 0 && (
        <p className="text-2xl px-global">No results found</p>
      )}

      {query && data.results.length > 0 && (
        <>
          <h1 className="text-2xl px-global">
            Showing results for &quot;{query}&quot;
          </h1>

          <MediaGrid items={data.results} />
          <Pagination
            page={page}
            totalPages={data.total_pages}
            query={{
              q: query,
            }}
          />
        </>
      )}
    </>
  );
}
