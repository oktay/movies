"use client";

import { fetchApi } from "@/lib/api";
import { useEffect } from "react";
import useSWRInfinite from "swr/infinite";
import MediaCard from "../media/card";
import MediaGrid from "./_base";
import Spinner from "../spinner";
import { useInView } from "react-intersection-observer";

export default function MediaDynamicGrid({ query }: { query: QueryItem }) {
  const { data, setSize } = useSWRInfinite(
    (index) => `/${query.type}/${query.query}?page=${index + 1}`,
    (arg) => fetchApi(arg),
    {
      revalidateFirstPage: false,
      revalidateOnFocus: false,
      suspense: true,
    }
  );
  const items: Media[] = data ? [].concat(...data.map((i) => i.results)) : [];
  const isLastPage =
    data && data[data.length - 1].page === data[data.length - 1].total_pages;
  const [ref, inView] = useInView();

  useEffect(() => {
    if (!inView) return;
    setSize((size) => size + 1);
  }, [inView, setSize]);

  return (
    <>
      <MediaGrid>
        {items.map((item) => (
          <MediaCard key={item.id} media={item} />
        ))}
      </MediaGrid>

      {!isLastPage && (
        <div className="py-12 flex justify-center text-3xl" ref={ref}>
          <Spinner />
        </div>
      )}
    </>
  );
}
