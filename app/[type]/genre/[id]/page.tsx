import MediaGrid from "@/components/grid/static";
import Pagination from "@/components/pagination";
import { getGenre, getGenreList, lists } from "@/lib/api";

export const revalidate = 60 * 60 * 24; // 24 hours
export const runtime = "edge";
export default async function QueryPage({
  params,
  searchParams,
}: {
  params: { id: number; type: MediaType };
  searchParams: { page: string };
}) {
  const genre = await getGenreList(params.type);
  const data = await getGenre(params.type, params.id, searchParams.page);
  const name = genre.genres.find((g) => g.id == params.id)?.name;

  return (
    <main className="my-global">
      <h1 className="text-2xl px-global mb-5">
        {name} {params.type === "tv" ? "TV Shows" : "Movies"}
      </h1>
      <MediaGrid items={data.results} />
      <Pagination page={searchParams.page} totalPages={data.total_pages} />
    </main>
  );
}
