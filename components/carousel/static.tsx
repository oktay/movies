import MediaCarouselBase from "./_base";
import MediaCarouselItems from "./_items";

export default function MediaCarousel({
  title,
  items,
  type,
}: {
  type?: "movie" | "tv" | "person";
  title?: React.ReactNode | string;
  items: Media[] | Person[];
}) {
  return (
    <MediaCarouselBase title={title}>
      <MediaCarouselItems items={items} type={type} />
    </MediaCarouselBase>
  );
}
