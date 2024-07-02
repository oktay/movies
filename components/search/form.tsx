"use client";

import { sendGAEvent } from "@next/third-parties/google";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SearchForm({ query }: { query?: string }) {
  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTimeout(() => router.replace(`/search?q=${e.target.value}`), 1000);
  }

  useEffect(() => {
    if (!query) return;
    sendGAEvent({
      event: "search",
      search_term: query,
    })
  }, [query]);

  return (
    <input
      type="text"
      name="q"
      className="w-full text-2xl p-4 bg-zinc-800 border border-transparent border-b-zinc-700 focus:outline-none focus:border focus:border-theme-500"
      placeholder="Search..."
      defaultValue={query}
      onChange={handleChange}
      required
      autoFocus
    />
  );
}
