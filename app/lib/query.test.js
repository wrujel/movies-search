import { describe, it, expect } from "vitest";
import { isValidQuery, validateQuery, MIN_QUERY_LENGTH } from "./query";

describe("isValidQuery", () => {
  it("rejects empty / too-short queries", () => {
    expect(isValidQuery("")).toBe(false);
    expect(isValidQuery("ab")).toBe(false);
  });

  it("accepts 3+ char queries with allowed punctuation", () => {
    expect(isValidQuery("dune")).toBe(true);
    expect(isValidQuery("spider-man")).toBe(true);
    expect(isValidQuery("amélie".normalize())).toBe(false); // accents not allowed
  });

  it("rejects illegal characters", () => {
    expect(isValidQuery("abc@def")).toBe(false);
    expect(isValidQuery("foo<bar>")).toBe(false);
  });
});

describe("validateQuery", () => {
  it("returns null for empty input (no error shown yet)", () => {
    expect(validateQuery("")).toBeNull();
  });

  it("flags special characters before length", () => {
    expect(validateQuery("a@")).toMatch(/special characters/i);
  });

  it("flags too-short queries", () => {
    expect(validateQuery("ab")).toContain(String(MIN_QUERY_LENGTH));
  });

  it("returns null for valid queries", () => {
    expect(validateQuery("inception")).toBeNull();
  });
});
