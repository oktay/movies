import Spinner from "@/components/spinner";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen text-4xl">
      <Spinner />
    </div>
  );
}
