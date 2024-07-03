"use client";

import { sendGAEvent } from "@next/third-parties/google";
import { track } from "@vercel/analytics";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function SearchForm({ query }: { query?: string }) {
  const router = useRouter();

  const handleChange = useDebouncedCallback((e) => {
    router.replace(`/search?q=${e.target.value}`);

    sendGAEvent("event", "search", {
      search_term: e.target.value,
    })
    track("Search", {
      search_term: e.target.value,
    });
  }, 1000);

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
