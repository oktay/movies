export default function EpisodeGrid({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ul className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-2 gap-y-4">
      {children}
    </ul>
  );
}
