import { NextResponse } from "next/server";
import { omdbSearch } from "../../lib/omdb";

// GET /api/search?query=&page=&type=&year=&validate=1
export async function GET(request) {
  const sp = request.nextUrl.searchParams;
  const query = sp.get("query") ?? "";
  const page = Number(sp.get("page")) || 1;
  const type = sp.get("type") ?? undefined;
  const year = sp.get("year") ?? undefined;
  const validate = sp.get("validate") === "1";

  try {
    const data = await omdbSearch({
      query,
      page,
      type,
      year,
      validate,
      signal: request.signal,
    });
    return NextResponse.json(data, {
      // Let shared caches (CDN) serve repeat queries; mirrors the in-process TTL.
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (err) {
    if (err?.name === "AbortError")
      return new NextResponse(null, { status: 499 });
    return NextResponse.json({ error: err.message }, { status: 502 });
  }
}
