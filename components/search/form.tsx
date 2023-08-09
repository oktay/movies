export default function SearchForm({ query }: { query?: string }) {
  return (
    <form action="/search">
      <input
        type="text"
        name="q"
        className="w-full text-2xl p-4 bg-zinc-800 border border-transparent border-b-zinc-700 focus:outline-none focus:border focus:border-blue-500"
        placeholder="Search..."
        defaultValue={query}
        required
        autoFocus
      />
    </form>
  );
}
