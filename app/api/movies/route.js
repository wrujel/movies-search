import { NextResponse } from "next/server";
import { omdbDetailsBatch } from "../../lib/omdb";

// GET /api/movies?ids=tt1,tt2,tt3  — batch detail lookup for prefetching.
export async function GET(request) {
  const ids = (request.nextUrl.searchParams.get("ids") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  try {
    const movies = await omdbDetailsBatch({ ids, signal: request.signal });
    return NextResponse.json(
      { movies },
      {
        headers: {
          "Cache-Control": "public, s-maxage=600, stale-while-revalidate=3600",
        },
      },
    );
  } catch (err) {
    if (err?.name === "AbortError")
      return new NextResponse(null, { status: 499 });
    return NextResponse.json({ error: err.message }, { status: 502 });
  }
}
