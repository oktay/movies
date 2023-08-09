import MediaDynamicGrid from "@/components/grid/dynamic";
import { lists } from "@/lib/api";

export default function QueryPage({ params }: { params: { query: Query } }) {
  const item = lists.movie.find((item) => item.query === params.query);

  if (!item) throw new Error("This page could not be found.");

  return (
    <main>
      <h1 className="text-2xl font-bold px-4 md:px-8 py-4">{item.title}</h1>
      <MediaDynamicGrid query={item} />
    </main>
  );
}
