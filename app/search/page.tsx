"use client";

import { useRouter } from "next/navigation";
import SearchResults from "@/components/search/results";

export default function QueryPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const router = useRouter();

  return (
    <main>
      <input
        type="text"
        name="q"
        className="w-full text-2xl p-4 mb-8 bg-zinc-800 border border-transparent border-b-zinc-700 focus:outline-none focus:border focus:border-blue-500"
        placeholder="Search..."
        defaultValue={searchParams.q}
        onChange={(e) =>
          setTimeout(() => router.replace(`/search?q=${e.target.value}`), 500)
        }
        autoFocus
      />
      <SearchResults query={searchParams.q} />
    </main>
  );
}
