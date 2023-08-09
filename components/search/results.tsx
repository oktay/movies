import { fetchApi } from "@/lib/api";
import MediaGrid from "@/components/grid/static";
import useSWRInfinite from "swr/infinite";
import Spinner from "@/components/spinner";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function SearchResults({ query }: { query: string }) {
  const { data, setSize } = useSWRInfinite(
    (index) => `/search/multi?page=${index + 1}&query=${query}`,
    (arg) => fetchApi(arg),
    {
      revalidateFirstPage: false,
      revalidateOnFocus: false,
      suspense: true,
    }
  );
  const [ref, inView] = useInView({
    threshold: 1,
  });
  const items: Media[] = data ? [].concat(...data.map((i) => i.results)) : [];
  const isLastPage =
    data && data[data.length - 1].page >= data[data.length - 1].total_pages;

  useEffect(() => {
    if (!inView) return;
    setSize((size) => size + 1);
  }, [inView, setSize]);

  return (
    <>
      {query && items.length === 0 && (
        <p className="text-2xl px-4 lg:px-8">No results found</p>
      )}

      {query && items.length > 0 && (
        <>
          <h1 className="text-2xl px-4 lg:px-8 mb-8">
            Showing results for &quot;{query}&quot;
          </h1>
          <MediaGrid items={items} />
          {!isLastPage && (
            <div className="py-12 flex justify-center text-3xl" ref={ref}>
              <Spinner />
            </div>
          )}
        </>
      )}
    </>
  );
}
