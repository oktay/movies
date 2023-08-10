"use client";

import { useRouter } from "next/navigation";

export default function SearchForm({ query }: { query?: string }) {
  const router = useRouter();

  return (
    <input
      type="text"
      name="q"
      className="w-full text-2xl p-4 bg-zinc-800 border border-transparent border-b-zinc-700 focus:outline-none focus:border focus:border-blue-500"
      placeholder="Search..."
      defaultValue={query}
      onChange={(e) =>
        setTimeout(() => router.replace(`/search?q=${e.target.value}`), 500)
      }
      required
      autoFocus
    />
  );
}
