import SearchForm from "@/components/search/form";
import SearchResults from "@/components/search/results";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";

type Props = {
  searchParams: { q: string; page: string };
}

export function generateMetadata({ searchParams }: Props): Metadata {
  const { q } = searchParams;
  const title = q ? `Results for: ${q}` : "Search";
  return {
    title: `${title}${siteConfig.titleSuffix}`,
  };
}

export default function SearchPage({
  searchParams,
}: Props) {
  return (
    <main className="space-y-4">
      <SearchForm query={searchParams.q} />
      {searchParams.q && (
        <SearchResults query={searchParams.q} page={searchParams.page} />
      )}
    </main>
  );
}
