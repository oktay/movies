import MediaGridBase from "./_base";
import MediaCard from "../media/card";

export default function MediaGrid({ items }: { items: Media[] }) {
  return (
    <MediaGridBase>
      {items.map((item) => (
        <MediaCard key={item.id} media={item} />
      ))}
    </MediaGridBase>
  );
}
