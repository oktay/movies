"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function SeasonSelect({ count }: { count: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <select
      onChange={(e) =>
        router.replace(`?season=${e.target.value}`, {
          scroll: false,
        })
      }
      defaultValue={searchParams.get("season") || 1}
      className="bg-zinc-800 text-sm px-3 py-1"
    >
      {Array.from({ length: count }).map((_, i) => (
        <option key={i} value={i + 1}>
          Season {i + 1}
        </option>
      ))}
    </select>
  );
}
