import MediaCarouselBase from "./_base";
import MediaCarouselItems from "./_items";

export default function MediaCarousel({
  title,
  link,
  items,
  type,
}: {
  type?: "movie" | "tv" | "person";
  title?: React.ReactNode | string;
  link?: string;
  items: Media[] | Person[];
}) {
  return (
    <MediaCarouselBase title={title} link={link}>
      <MediaCarouselItems items={items} type={type} />
    </MediaCarouselBase>
  );
}
