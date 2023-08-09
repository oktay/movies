import MediaCarouselBase from "./_base";
import MediaCarouselItems from "./_items";

export default function MediaCarousel({
  title,
  items,
}: {
  title?: React.ReactNode | string;
  items: Media[];
}) {
  return (
    <MediaCarouselBase title={title}>
      <MediaCarouselItems items={items} />
    </MediaCarouselBase>
  );
}
