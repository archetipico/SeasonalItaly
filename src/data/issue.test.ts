import { describe, expect, it } from "vitest";
import { monthIssue, nextMonth, previousMonth } from "./issue";

const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);

describe("month steps", () => {
  it("wraps at both ends of the year", () => {
    expect(nextMonth(12)).toBe(1);
    expect(previousMonth(1)).toBe(12);
  });

  it("moves by one inside the year", () => {
    expect(nextMonth(6)).toBe(7);
    expect(previousMonth(6)).toBe(5);
  });
});

describe("monthIssue", () => {
  it("files every entry under the right list in every month", () => {
    for (const month of MONTHS) {
      const { fruit, veg, soon, ending, away } = monthIssue(month);
      for (const item of [...fruit, ...veg]) {
        expect(item.peak).toContain(month);
        expect(item.isImported).toBeFalsy();
      }
      for (const item of soon) {
        expect(item.shoulder).toContain(month);
        expect(item.peak).toContain(nextMonth(month));
        expect(item.isImported).toBeFalsy();
      }
      for (const item of ending) {
        expect(item.shoulder).toContain(month);
        expect(item.peak).not.toContain(nextMonth(month));
        expect(item.isImported).toBeFalsy();
      }
      for (const item of away) {
        expect(item.isImported).toBe(true);
        expect(item.peak).toContain(month);
      }
    }
  });

  it("shows no entry twice in one month", () => {
    for (const month of MONTHS) {
      const { fruit, veg, soon, ending, away } = monthIssue(month);
      const names = [...fruit, ...veg, ...soon, ...ending, ...away].map((item) => item.name);
      expect(new Set(names).size).toBe(names.length);
    }
  });
});
