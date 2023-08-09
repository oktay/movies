import MediaGridBase from "./_base";
import MediaCard from "../media/card";
import PersonCard from "../person/card";

export default function MediaGrid({
  items,
  type,
}: {
  items: (Media & Person)[];
  type?: "tv" | "movie" | "person";
}) {
  return (
    <MediaGridBase>
      {items.map((item) =>
        item.media_type === "person" || type === "person" ? (
          <PersonCard key={item.id} person={item} />
        ) : (
          <MediaCard key={item.id} media={item} />
        )
      )}
    </MediaGridBase>
  );
}
