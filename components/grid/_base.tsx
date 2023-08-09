export default function MediaGridBase({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-2 px-global">
      {children}
    </div>
  );
}
