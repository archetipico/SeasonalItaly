import { describe, expect, it } from "vitest";
import { countLabel, fill, monthName, sayMonths } from "./copy";

describe("fill", () => {
  it("replaces known slots and leaves unknown ones visible", () => {
    expect(fill("{{a}} e {{b}}", { a: 1 })).toBe("1 e {{b}}");
  });
});

describe("countLabel", () => {
  it("uses the singular for one and the plural otherwise", () => {
    expect(countLabel(1)).toBe("1 voce");
    expect(countLabel(0)).toBe("0 voci");
    expect(countLabel(2)).toBe("2 voci");
  });
});

describe("monthName", () => {
  it("counts months from one", () => {
    expect(monthName(1)).toBe("gennaio");
    expect(monthName(12)).toBe("dicembre");
  });
});

describe("sayMonths", () => {
  it("names a single month alone", () => {
    expect(sayMonths([3])).toBe("marzo");
  });

  it("joins two months with e and longer lists with commas, in the order given", () => {
    expect(sayMonths([11, 12])).toBe("novembre e dicembre");
    expect(sayMonths([11, 12, 1])).toBe("novembre, dicembre e gennaio");
  });

  it("says all year for twelve months", () => {
    expect(sayMonths([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])).toBe("tutto l'anno");
  });
});
