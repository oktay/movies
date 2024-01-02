import ProviderCard from "./card";

export default function ProviderGrid({
  title,
  list,
  link,
}: {
  title: React.ReactNode;
  list?: Provider[];
  link: string;
}) {
  return (
    <div>
      <p className="py-2 mb-2 font-medium border-b border-zinc-800">{title}</p>
      <div className="flex flex-wrap gap-4 py-2">
        {list?.map((provider) => (
          <ProviderCard key={provider.provider_name} provider={provider} link={link} />
        )) ?? <p className="text-white/60">No provider</p>}
      </div>
    </div>
  );
}
