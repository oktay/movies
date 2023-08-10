"use client";

import { useState } from "react";
import MediaGrid from "../grid/static";
import PersonPhotos from "./photos";
import PersonCredits from "./credits";

export default function PersonDetails({ person }: { person: Person }) {
  const [activeTab, setActiveTab] = useState("known_for");

  const knownFor = () => {
    const department = person.known_for_department;
    let results;

    if (department === "Acting") {
      results = person.combined_credits?.cast;
    } else if (department === "Directing") {
      results = person.combined_credits?.crew?.filter(
        (item) => item.department === "Directing"
      );
    } else if (department === "Production") {
      results = person.combined_credits?.crew?.filter(
        (item) => item.department === "Production"
      );
    } else if (department === "Writing" || department === "Creator") {
      results = person.combined_credits?.crew?.filter(
        (item) => item.department === "Writing"
      );
    }

    // if no results, return
    if (!results) return;

    // remove duplicates
    results = removeDuplicates(results);

    // remove adult
    results = results.filter((item: Credit) => {
      if (item.adult) return false;
      return true;
    });

    // sort by popularity
    results.sort((a: Credit, b: Credit) =>
      a.vote_count > b.vote_count ? -1 : 1
    );

    return results;
  };

  function removeDuplicates(myArr: any[]) {
    return myArr.filter((obj, pos, arr) => {
      const prop = obj.title ? "title" : "name";
      return arr.map((mapObj) => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  }

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
        {activeTab === "known_for" && knownFor() && (
          <MediaGrid items={knownFor() as Media[]} />
        )}
        {activeTab === "credits" && <PersonCredits person={person} />}
        {activeTab === "photos" && <PersonPhotos person={person} />}
      </div>
    </div>
  );
}
