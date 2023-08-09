import MediaCard from "../media/card";

export default function MediaCarouselItems({ items }: { items: Media[] }) {
  return (
    <ul className="overflow-x-scroll whitespace-nowrap snap-mandatory snap-x scroll-p-4 pl-4 md:scroll-p-8 md:pl-8">
      {items.map((item: Media) => (
        <li key={item.id} className="w-40 lg:w-60 inline-block mr-2 snap-start whitespace-normal">
          <MediaCard media={item} />
        </li>
      ))}
    </ul>
  );
}
