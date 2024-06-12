import SearchForm from "@/components/search/form";
import SearchResults from "@/components/search/results";

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q: string; page: string };
}) {
  return (
    <main className="space-y-4">
      <SearchForm query={searchParams.q} />
      {searchParams.q && (
        <SearchResults query={searchParams.q} page={searchParams.page} />
      )}
    </main>
  );
}
