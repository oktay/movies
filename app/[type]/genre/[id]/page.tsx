import MediaGrid from "@/components/grid/static";
import Pagination from "@/components/pagination";
import { siteConfig } from "@/config/site";
import { getGenre, getGenreList } from "@/lib/api";
import { getGenreName, getMediaCategoryTitle } from "@/lib/utils";
import { Metadata } from "next";

type Props = {
  params: { id: number; type: MediaType };
  searchParams: { page: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const genreList = await getGenreList(params.type);
  const name = getGenreName(params.id, genreList)
  const type = getMediaCategoryTitle(params.type);
  return {
    title: `${name} ${type}${siteConfig.titleSuffix}`,
  };
}

export default async function QueryPage({ params, searchParams }: Props) {
  const genreList = await getGenreList(params.type);
  const data = await getGenre(params.type, params.id, searchParams.page);
  const name = getGenreName(params.id, genreList)
  const title = getMediaCategoryTitle(params.type);

  return (
    <main className="my-global">
      <h1 className="text-2xl px-global mb-5">
        {name} {title}
      </h1>
      <MediaGrid items={data.results} />
      <Pagination page={searchParams.page} totalPages={data.total_pages} />
    </main>
  );
}
