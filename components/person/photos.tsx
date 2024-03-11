import Image from "next/image";

export default function PersonPhotos({ person }: { person: Person }) {
  return (
    <div className="px-global">
      {person.images?.profiles?.length! > 0 && (
        <div>
          <h2 className="text-xl mb-5 inline-block">Posters</h2>
          <span className="ml-2 text-white/60">
            {person.images?.profiles.length} Images
          </span>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
            {person.images?.profiles.map((image) => (
              <div key={image.file_path} className="aspect-[2/3]">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                  alt=""
                  width={500}
                  height={280}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
