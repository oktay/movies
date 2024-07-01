import { getPerson } from "@/lib/api";
import PersonDetails from "@/components/person/details";
import PersonHero from "@/components/person/hero";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const person = await getPerson(params.id);
  return {
    title: `${person.name}${siteConfig.titleSuffix}`,
  };
}

export default async function PersonDetail({ params }: Props) {
  const person = await getPerson(params.id);

  return (
    <div className="my-global ">
      <PersonHero person={person} />
      <PersonDetails person={person} />
    </div>
  );
}
