import MediaGridBase from "./_base";
import MediaCard from "../media/card";
import PersonCard from "../person/card";

export default function MediaGrid({ items }: { items: (Media & Person)[] }) {
  return (
    <MediaGridBase>
      {items.map((item) =>
        item.media_type === "person" ? (
          <PersonCard key={item.id} person={item} />
        ) : (
          <MediaCard key={item.id} media={item} />
        )
      )}
    </MediaGridBase>
  );
}
