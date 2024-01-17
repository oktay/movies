import { getPerson } from "@/lib/api";
import PersonDetails from "@/components/person/details";
import PersonHero from "@/components/person/hero";

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
