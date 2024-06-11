"use client";

import { getRegion } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PiCaretDownBold } from "react-icons/pi";

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
    <div className="relative">
      <select
        onChange={(e) => setRegion(e.target.value)}
        value={region!}
        className="w-36 bg-zinc-800 text-sm pl-3 pr-10 py-2 border-2 border-zinc-700 appearance-none font-medium truncate"
      >
        {regions.map((region) => (
          <option key={region.iso_3166_1} value={region.iso_3166_1}>
            {region.english_name}
          </option>
        ))}
      </select>
      <PiCaretDownBold className="absolute text-lg right-3 top-2.5" />
    </div>
  );
}
