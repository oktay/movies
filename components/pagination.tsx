import Link from "next/link";

export default function Pagination({
  query,
  page = "1",
  totalPages,
}: {
  query?: any;
  page: string;
  totalPages: number;
}) {
  return (
    <div className="flex justify-center items-center mt-6">
      <Link
        href={{
          query: { ...query, page: parseInt(page) - 1 },
        }}
        className={`button-secondary ${
          page === "1" && "pointer-events-none text-neutral-700"
        }`}
        aria-disabled={page === "1"}
      >
        Previous
      </Link>
      <span className="px-5 p-3 text-sm text-neutral-500 text-light">
        {page} of {totalPages > 500 ? "500+" : totalPages}
      </span>
      <Link
        href={{
          query: { ...query, page: parseInt(page) + 1 },
        }}
        className={`button-secondary ${
          (page === "500" || parseInt(page) === totalPages) &&
          "pointer-events-none text-neutral-700"
        }`}
        aria-disabled={page === "500" || parseInt(page) === totalPages}
      >
        Next
      </Link>
    </div>
  );
}
