"use client";

import { useState } from "react";
import MediaGrid from "../grid/static";
import PersonPhotos from "./photos";
import PersonCredits from "./credits";

export default function PersonDetails({ person }: { person: Person }) {
  const [activeTab, setActiveTab] = useState("known_for");
  const filteredCredits = person.combined_credits?.cast?.filter(
    (item, index, self) => index === self.findIndex((t) => t.id === item.id)
  );

  return (
    <div>
      <div className="flex text-center lg:justify-center lg:gap-8 lg:py-8">
        {person.combined_credits && (
          <button
            onClick={() => setActiveTab("known_for")}
            className={`tab ${activeTab === "known_for" && "tab-active"}`}
          >
            Known For
          </button>
        )}
        {person.combined_credits ? (
          <button
            onClick={() => setActiveTab("credits")}
            className={`tab ${activeTab === "credits" && "tab-active"}`}
          >
            Credits
          </button>
        ) : null}

        {person.images?.profiles || person.images?.profiles.length ? (
          <button
            onClick={() => setActiveTab("photos")}
            className={`tab ${activeTab === "photos" && "tab-active"}`}
          >
            Photos
          </button>
        ) : null}
      </div>

      <div className="my-6 lg:my-0">
        {activeTab === "known_for" && filteredCredits && (
          <MediaGrid items={filteredCredits} />
        )}
        {activeTab === "credits" && <PersonCredits person={person} />}
        {activeTab === "photos" && <PersonPhotos person={person} />}
      </div>
    </div>
  );
}
