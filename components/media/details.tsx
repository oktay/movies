"use client";

import { useState } from "react";

type TabIdentifier = "overview" | "episodes" | "videos" | "photos";
export default function MediaDetails({
  media,
  tabComponents,
}: {
  media: Media;
  tabComponents: Record<TabIdentifier, React.ReactNode>;
}) {
  const [activeTab, setActiveTab] = useState<TabIdentifier>(
    "overview"
  );

  return (
    <div>
      <div className="flex text-center lg:justify-center lg:gap-8 lg:py-8">
        <button
          onClick={() => setActiveTab("overview")}
          className={`tab ${activeTab === "overview" && "tab-active"}`}
        >
          Overview
        </button>
        {media.number_of_episodes && (
          <button
            onClick={() => setActiveTab("episodes")}
            className={`tab ${activeTab === "episodes" && "tab-active"}`}
          >
            Episodes
          </button>
        )}
        {media.videos?.results.length ? (
          <button
            onClick={() => setActiveTab("videos")}
            className={`tab ${activeTab === "videos" && "tab-active"}`}
          >
            Videos
          </button>
        ) : null}

        {media.images?.posters.length || media.images?.backdrops.length ? (
          <button
            onClick={() => setActiveTab("photos")}
            className={`tab ${activeTab === "photos" && "tab-active"}`}
          >
            Photos
          </button>
        ) : null}
      </div>

      <div className="my-6 lg:my-0">
        {activeTab === "overview" && tabComponents.overview}
        {activeTab === "episodes" && tabComponents.episodes}
        {activeTab === "videos" && tabComponents.videos}
        {activeTab === "photos" && tabComponents.photos}
      </div>
    </div>
  );
}
