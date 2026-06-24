import { describe, it, expect } from "vitest";
import { normalizeYear, mergeSet, thumbnailUrl } from "./movies";

describe("normalizeYear", () => {
  it("parses a plain year", () => {
    expect(normalizeYear("2010")).toBe(2010);
  });

  it("takes the start of a range (en-dash or hyphen)", () => {
    expect(normalizeYear("2010–2014")).toBe(2010);
    expect(normalizeYear("2010-2014")).toBe(2010);
  });

  it("returns null for falsy / unparseable values", () => {
    expect(normalizeYear(null)).toBeNull();
    expect(normalizeYear("")).toBeNull();
    expect(normalizeYear("N/A")).toBeNull();
  });
});

describe("mergeSet", () => {
  it("returns a new set containing the added ids", () => {
    const prev = new Set(["a"]);
    const next = mergeSet(prev, ["b"]);
    expect(next).not.toBe(prev);
    expect([...next].sort()).toEqual(["a", "b"]);
  });

  it("returns the SAME reference when nothing was added", () => {
    const prev = new Set(["a", "b"]);
    expect(mergeSet(prev, ["a"])).toBe(prev);
  });
});

describe("thumbnailUrl", () => {
  it("downscales the _SX width token", () => {
    expect(thumbnailUrl("https://m.media-amazon.com/x._V1_SX300.jpg")).toBe(
      "https://m.media-amazon.com/x._V1_SX120.jpg",
    );
  });

  it("accepts a custom width", () => {
    expect(thumbnailUrl("a._V1_SX300.jpg", 90)).toBe("a._V1_SX90.jpg");
  });

  it("no-ops on non-matching urls and null", () => {
    expect(thumbnailUrl("https://x/poster.jpg")).toBe("https://x/poster.jpg");
    expect(thumbnailUrl(null)).toBeNull();
  });
});
