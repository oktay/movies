import Image from "next/image";

export default function MediaCard({ media }: { media: Media }) {
  return (
    <div className="relative aspect-[2/3]">
      <Image
        className="w-full h-full object-cover"
        src={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
        width={500}
        height={750}
        alt=""
        unoptimized
      />
      <div className="mt-2">
        <h3 className="line-clamp-1">{media.name || media.title}</h3>
      </div>
    </div>
  );
}
