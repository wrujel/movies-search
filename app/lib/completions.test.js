import { describe, it, expect } from "vitest";
import { buildCompletions } from "./completions";

describe("buildCompletions", () => {
  it("returns [] for an empty query", () => {
    expect(buildCompletions("", ["Inception"], 6)).toEqual([]);
  });

  it("suggests phrases whose first word starts with the query", () => {
    const titles = ["Inception", "Inception: The Cobol Job", "Interstellar"];
    const out = buildCompletions("inc", titles, 6);
    expect(out).toContain("Inception");
    expect(out).not.toContain("Interstellar");
  });

  it("ranks more frequent heads first", () => {
    const titles = ["Dune", "Dune Part Two", "Dune Messiah", "Dunkirk"];
    const out = buildCompletions("dun", titles, 6);
    expect(out[0].toLowerCase()).toBe("dune");
  });

  it("respects the limit", () => {
    const titles = ["Star Wars", "Star Trek", "Stargate", "Starship"];
    expect(buildCompletions("star", titles, 2).length).toBeLessThanOrEqual(2);
  });
});
