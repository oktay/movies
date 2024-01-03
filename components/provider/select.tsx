"use client";

import { getRegion } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function RegionSelect({ regions }: { regions: Region[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedRegion = searchParams.get("region");
  const [region, setRegion] = useState(selectedRegion);

  useEffect(() => {
    if (!selectedRegion) {
      setRegion(getRegion() || "US");
    }
  }, [selectedRegion]);

  useEffect(() => {
    router.replace(`?region=${region}`, {
      scroll: false,
    });
  }, [region, router]);

  return (
    <select
      onChange={(e) => setRegion(e.target.value)}
      value={region!}
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
