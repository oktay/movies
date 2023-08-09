import MediaCard from "../media/card";
import PersonCard from "../person/card";

export default function MediaCarouselItems({
  items,
  type,
}: {
  items: Media[] | Person[];
  type?: "tv" | "movie" | "person";
}) {
  return (
    <ul className="carousel overflow-x-scroll whitespace-nowrap snap-mandatory snap-x scroll-p-4 pl-4 md:scroll-p-10 md:pl-10 lg:scroll-p-12 lg:pl-12">
      {items.map((item) => (
        <li
          key={item.id}
          className="w-40 lg:w-60 inline-block mr-2 snap-start whitespace-normal"
        >
          {item.media_type === "person" || type === "person" ? (
            <PersonCard person={item as Person} />
          ) : (
            <MediaCard media={item as Media} />
          )}
        </li>
      ))}
    </ul>
  );
}
