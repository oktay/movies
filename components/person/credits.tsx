import { getYear } from "@/lib/utils";
import PersonCredit from "./credit";
import { useState } from "react";

export default function PersonCredits({ person }: { person: Person }) {
  const [type, setType] = useState("all");

  const sort = (a: any, b: any) => {
    const aYear = getYear(a.release_date || a.first_air_date);
    const bYear = getYear(b.release_date || b.first_air_date);
    if (!aYear || !bYear) return -1;
    return bYear - aYear;
  };

  const filter = (credit: Credit) => {
    return type === "all" || credit.media_type === type;
  };

  const cast =
    person.combined_credits?.cast &&
    person.combined_credits?.cast.filter(filter).sort(sort);
  const crew =
    person.combined_credits?.crew &&
    person.combined_credits?.crew.filter(filter).sort(sort);

  return (
    <div className="px-global">
      <select
        onChange={(e) => setType(e.target.value)}
        defaultValue={type}
        className="mb-4 bg-zinc-800 text-sm px-3 py-1"
      >
        <option value="all">All</option>
        <option value="movie">Movies</option>
        <option value="tv">TV Shows</option>
      </select>

      {cast?.length && (
        <>
          <h2 className="text-xl mb-4">Acting</h2>
          <div className="space-y-1">
            {cast.map((credit) => (
              <PersonCredit key={credit.credit_id} credit={credit} />
            ))}
          </div>
        </>
      )}

      {crew?.length && (
        <>
          <h2 className="text-xl my-4">Production</h2>
          <div className="space-y-1">
            {crew.map((credit) => (
              <PersonCredit key={credit.credit_id} credit={credit} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
