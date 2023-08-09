"use client";

import { useState } from "react";
import MediaOverview from "./overview";

export default function MediaDetails({ media }: { media: Media }) {
  const [activeTab, setActiveTab] = useState("overview");

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
        {media.videos && (
          <button
            onClick={() => setActiveTab("videos")}
            className={`tab ${activeTab === "videos" && "tab-active"}`}
          >
            Videos
          </button>
        )}
        {media.images && (
          <button
            onClick={() => setActiveTab("photos")}
            className={`tab ${activeTab === "photos" && "tab-active"}`}
          >
            Photos
          </button>
        )}
      </div>

      <div>{activeTab === "overview" && <MediaOverview media={media} />}</div>
    </div>
  );
}
