import { describe, expect, it } from "vitest";
import { MONTH_COLOURS, monthStyle } from "./palette";

/** Page paper, as in `base.css`. */
const PAPER = "#fffdf9";

/** Compute the WCAG contrast ratio of two hex colours. */
function contrast(first: string, second: string): number {
  const luminance = (hex: string) => {
    const [r, g, b] = [1, 3, 5].map((at) => {
      const channel = parseInt(hex.slice(at, at + 2), 16) / 255;
      return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const [dark, light] = [luminance(first), luminance(second)].sort((x, y) => x - y);
  return (light + 0.05) / (dark + 0.05);
}

describe("contrast", () => {
  it("gives the published 21:1 for black on white", () => {
    expect(contrast("#000000", "#ffffff")).toBeCloseTo(21);
  });
});

describe("MONTH_COLOURS", () => {
  it("holds one set for each month", () => {
    expect(MONTH_COLOURS).toHaveLength(12);
  });

  it("keeps text readable and shapes visible in every month", () => {
    for (const { bg, ink, a, b } of MONTH_COLOURS) {
      expect(contrast(ink, bg)).toBeGreaterThanOrEqual(7);
      expect(contrast(a, bg)).toBeGreaterThanOrEqual(3);
      expect(contrast(b, bg)).toBeGreaterThanOrEqual(3);
      expect(contrast(a, PAPER)).toBeGreaterThanOrEqual(4.5);
    }
  });
});

describe("monthStyle", () => {
  it("maps the first and last month to their colours", () => {
    expect(monthStyle(1)["--bg"]).toBe("#dbe5ec");
    expect(monthStyle(12)["--a"]).toBe("#2a6650");
  });
});
