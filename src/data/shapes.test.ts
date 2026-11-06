import { describe, expect, it } from "vitest";
import { fruits, vegetables } from "./seasonal";
import { COVER_SIZE, SHAPES, monthShapes, shapeOf } from "./shapes";
import { monthIssue } from "./issue";

const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);

describe("shapeOf", () => {
  it("finds the drawing of a known entry and null for an unknown one", () => {
    expect(shapeOf("limone")).toBe("limone");
    expect(shapeOf("non esiste")).toBeNull();
  });

  it("tells apart names that hold one another", () => {
    expect(shapeOf("mela")).toBe("mela");
    expect(shapeOf("melanzana")).not.toBe("mela");
    expect(shapeOf("melone")).not.toBe("mela");
  });
});

describe("SHAPES", () => {
  it("has every pattern match at least one entry in the produce data", () => {
    const names = [...fruits, ...vegetables].map((item) => item.name);
    for (const [, pattern] of SHAPES) expect(names.some((name) => pattern.test(name))).toBe(true);
  });
});

describe("monthShapes", () => {
  it("fills every cover with distinct drawings of produce at peak that month", () => {
    for (const month of MONTHS) {
      const { fruit, veg } = monthIssue(month);
      const allowed = new Set([...fruit, ...veg].map((item) => shapeOf(item.name)));
      const shapes = monthShapes(month);
      expect(shapes).toHaveLength(COVER_SIZE);
      expect(new Set(shapes).size).toBe(COVER_SIZE);
      for (const shape of shapes) expect(allowed).toContain(shape);
    }
  });
});
