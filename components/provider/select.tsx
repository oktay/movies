"use client";

import { getRegion } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

export default function RegionSelect({ regions }: { regions: Region[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <select
      onChange={(e) =>
        router.replace(`?region=${e.target.value}`, {
          scroll: false,
        })
      }
      defaultValue={searchParams.get("region") || getRegion()}
      className="bg-zinc-800 text-sm px-3 py-1"
    >
      {regions.map((region) => (
        <option key={region.iso_3166_1} value={region.iso_3166_1}>
          {region.english_name}
        </option>
      ))}
    </select>
  );
}
