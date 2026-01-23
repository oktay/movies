import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("https://api.themoviedb.org/3/movie/550", {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_KEY}`,
    },
  });

  return NextResponse.json({
    status: res.status,
    ok: res.ok,
  });
}
