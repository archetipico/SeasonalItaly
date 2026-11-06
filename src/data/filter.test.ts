import { describe, expect, it } from "vitest";
import type { Item } from "@/data/seasonal";
import { normalize, searchItems } from "./filter";

const items: Item[] = [
  { name: "fico d'india", peak: [9] },
  { name: "banana", peak: [7], isImported: true },
  { name: "pera", peak: [7], shoulder: [6] },
];
const names = (found: Item[]) => found.map((it) => it.name);

describe("normalize", () => {
  it("folds case, accents, typographic apostrophes and runs of spaces", () => {
    expect(normalize("  Fico   D’Ìndia ")).toBe("fico d'india");
  });

  it("treats an acute accent typed as an apostrophe like one", () => {
    expect(normalize("d´india")).toBe("d'india");
  });
});

describe("searchItems", () => {
  it("matches a query typed with a curly apostrophe and capitals", () => {
    expect(names(searchItems(items, "FICO D’I"))).toEqual(["fico d'india"]);
  });

  it("matches inside a name and keeps data order", () => {
    expect(names(searchItems(items, "a"))).toEqual(["fico d'india", "banana", "pera"]);
  });

  it("returns nothing for a name that is not there", () => {
    expect(searchItems(items, "zucca")).toEqual([]);
  });

  it("treats a blank query as no query", () => {
    expect(searchItems(items, "   ")).toHaveLength(3);
  });
});
