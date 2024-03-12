"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getRegion } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function MediaNavbar({ media }: { media: Media }) {
  const type = media.name ? "tv" : "movie";
  const pathname = usePathname();
  const [region, setRegion] = useState("");

  useEffect(() => {
    setRegion(getRegion() || "US");
  }, []);

  return (
    <div className="flex text-center lg:justify-center lg:gap-8 lg:py-8">
      <Link
        href={`/${type}/detail/${media.id}`}
        className={`tab ${pathname.endsWith(media.id) && "tab-active"}`}
        replace={true}
      >
        Overview
      </Link>
      {media.number_of_episodes && (
        <Link
          href={`/${type}/detail/${media.id}/episodes`}
          className={`tab ${pathname.endsWith("episodes") && "tab-active"}`}
          replace={true}
        >
          Episodes
        </Link>
      )}
      {media.videos?.results.length ? (
        <Link
          href={`/${type}/detail/${media.id}/videos`}
          className={`tab ${pathname.endsWith("videos") && "tab-active"}`}
          replace={true}
        >
          Videos
        </Link>
      ) : null}

      {media.images?.posters.length || media.images?.backdrops.length ? (
        <Link
          href={`/${type}/detail/${media.id}/photos`}
          className={`tab ${pathname.endsWith("photos") && "tab-active"}`}
          replace={true}
        >
          Photos
        </Link>
      ) : null}
      {media.belongs_to_collection ? (
        <Link
          href={`/${type}/detail/${media.id}/collection`}
          className={`tab ${pathname.endsWith("collection") && "tab-active"}`}
          replace={true}
        >
          Collection
        </Link>
      ) : null}
      <Link
        href={`/${type}/detail/${media.id}/watch?region=${region}`}
        className={`tab ${pathname.endsWith("watch") && "tab-active"}`}
        replace={true}
      >
        Watch
      </Link>
    </div>
  );
}
