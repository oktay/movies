"use client";

export default function Error() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl">This page could not be found</h1>
        <p className="text-xl text-white/60 my-4">
          Looks like you&apos;ve followed a broken link or entered a URL that
          doesn&apos;t exist on this site.
        </p>
        <a href="/" className="px-4 py-2 border rounded-md inline-block text-white/50 border-current">
          Go home
        </a>
      </div>
    </main>
  );
}
