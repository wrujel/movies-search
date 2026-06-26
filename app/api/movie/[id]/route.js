import { NextResponse } from "next/server";
import { omdbDetail } from "../../../lib/omdb";

// GET /api/movie/:id
export async function GET(request, { params }) {
  // Next 15: route params are async and must be awaited.
  const { id } = await params;
  try {
    const detail = await omdbDetail({ id, signal: request.signal });
    if (!detail) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(detail, {
      // Details are immutable enough to cache hard at the edge.
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (err) {
    if (err?.name === "AbortError")
      return new NextResponse(null, { status: 499 });
    return NextResponse.json({ error: err.message }, { status: 502 });
  }
}
