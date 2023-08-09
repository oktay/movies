"use client";

export default function Error({ error }: { error: Error }) {
  return (
    <main>
      <h1>Oops!</h1>
      <p>{error.message}</p>
    </main>
  );
}
