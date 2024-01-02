import Image from "next/image";
import Link from "next/link";

export default function ProviderCard({
  provider,
  link,
}: {
  provider: Provider;
  link: string;
}) {
  return (
    <Link
      href={link}
      className="flex items-center border border-zinc-800/60 transition select-none hover:bg-zinc-800/60"
      target="_blank"
      rel="noreferrer noopener"
    >
      <Image
        src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
        alt={provider.provider_name}
        width={50}
        height={50}
        unoptimized
      />
      <span className="text-sm max-w-[10rem] px-2">
        {provider.provider_name}
      </span>
    </Link>
  );
}
