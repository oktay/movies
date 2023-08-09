import Link from "next/link";

export default function MediaCarouselBase({
  title,
  children,
  link,
}: {
  title: React.ReactNode | string;
  children: React.ReactNode;
  link?: string;
}) {
  return (
    <div className="my-global">
      <div className="px-global mb-5 text-lg lg:text-xl flex items-center">
        <span>{title}</span>
        {link && (
          <Link
            href={link}
            className="text-sm text-blue-500 font-semibold ml-4"
          >
            Explore More
          </Link>
        )}
      </div>
      <div>{children}</div>
    </div>
  );
}
