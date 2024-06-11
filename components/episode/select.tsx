"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { PiCaretDownBold } from "react-icons/pi";

export default function SeasonSelect({ count }: { count: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <div className="relative">
      <select
        onChange={(e) =>
          router.replace(`?season=${e.target.value}`, {
            scroll: false,
          })
        }
        defaultValue={searchParams.get("season") || 1}
        className="w-36 bg-zinc-800 text-sm pl-3 pr-10 py-2 border-2 border-zinc-700 appearance-none font-medium truncate"
      >
        {Array.from({ length: count }).map((_, i) => (
          <option key={i} value={i + 1}>
            Season {i + 1}
          </option>
        ))}
      </select>
      <PiCaretDownBold className="absolute text-lg right-3 top-2.5" />
    </div>
  );
}
