import { apiImgUrl, getPerson } from "@/lib/api";
import PersonDetails from "@/components/person/details";
import PersonHero from "@/components/person/hero";
import { Metadata, ResolvingMetadata } from "next";
import { DEFAULT_METADATA, SITE_NAME } from "@/lib/constants";

type Props = {
  params: { id: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {

  // fetch data
  const person = await getPerson(params.id);
  const biography = person.biography?.split(".", 1)[0];

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: person.name,
    description: biography,
    twitter: {
      title: person.name,
      description: biography,
      images: [`${apiImgUrl}/w500${person.profile_path}`, ...previousImages],
      card: "summary_large_image",
    },
    openGraph: {
      title: person.name,
      description: biography,
      url: `/person/detail/${params.id}`,
      type: "website",
      locale: DEFAULT_METADATA.openGraph.locale,
      siteName: SITE_NAME,
      images: [`${apiImgUrl}/w500${person.profile_path}`, ...previousImages],
    },
  };
}

export const revalidate = 60 * 60 * 24; // 24 hours
export const runtime = "edge";
export default async function PersonDetail({
  params,
}: {
  params: { id: string };
}) {
  const person = await getPerson(params.id);

  return (
    <div className="my-global ">
      <PersonHero person={person} />
      <PersonDetails person={person} />
    </div>
  );
}
