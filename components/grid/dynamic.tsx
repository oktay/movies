import { getQuery } from "@/lib/api";
import MediaCard from "../media/card";
import MediaGrid from "./_base";
import Link from "next/link";
import Pagination from "../pagination";

export default async function MediaDynamicGrid({
  query,
  page = "1",
}: {
  query: QueryItem;
  page?: string;
}) {
  const data = await getQuery(query, page);

  return (
    <>
      <MediaGrid>
        {data.results.map((item) => (
          <MediaCard key={item.id} media={item} />
        ))}
      </MediaGrid>
      <Pagination page={page} totalPages={data.total_pages} />
    </>
  );
}
