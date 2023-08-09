export default function MediaGridBase({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] px-4 gap-2 lg:px-8">
      {children}
    </div>
  );
}
