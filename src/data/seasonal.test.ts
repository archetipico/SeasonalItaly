import { describe, expect, it } from "vitest";
import { fruits, vegetables, isInSeason, peakItems, type Item } from "./seasonal";

const all: Item[] = [...fruits, ...vegetables];
/** Months of each entry in the national calendar. */
const NATIONAL_CALENDAR: Record<string, number[]> = {
  "aglio": [4, 5, 6, 7],
  "agretto": [3, 4, 5, 6],
  "albicocca": [6, 7, 8],
  "amarena": [5, 6],
  "anguria": [6, 7, 8, 9],
  "arancia": [1, 2, 3, 4, 11, 12],
  "asparago": [3, 4, 5, 6],
  "basilico": [6, 7],
  "bergamotto": [1, 2, 10, 11, 12],
  "bieta": [5, 6, 7, 8, 9, 10, 11],
  "broccolo": [1, 2, 3, 4, 5, 6, 9, 10, 11, 12],
  "broccolo romanesco": [5, 6, 7, 8, 9, 10, 11, 12],
  "cachi": [10, 11],
  "carciofo": [3, 4, 5, 6],
  "cardo": [1, 2, 11, 12],
  "carota": [1, 2, 3, 9, 10, 11, 12],
  "castagna": [10, 11, 12],
  "catalogna": [2, 3, 4, 5, 9, 10, 11, 12],
  "cavolfiore": [1, 2, 3, 4, 5, 7, 9, 10, 11, 12],
  "cavolo cappuccio": [1, 2, 3, 4, 9, 10, 11, 12],
  "cavolo nero": [1, 2, 3, 11],
  "cavolo verza": [1, 2, 3, 4, 9, 10, 11, 12],
  "cedro": [10, 11, 12],
  "cetriolo": [6, 7, 8, 9],
  "cicoria": [1, 2, 3, 4, 5, 6, 7],
  "ciliegia": [5, 6, 7],
  "cima di rapa": [1, 2, 3, 11, 12],
  "cipolla": [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  "cipollotto": [3, 4, 5],
  "fagiolino": [3, 4, 5, 6, 7, 8, 9, 10],
  "fagiolo": [6, 7, 8, 9, 10],
  "fava": [5, 6],
  "fico": [7, 8, 9],
  "fico d'india": [8, 9, 10],
  "finocchio": [1, 2, 3, 4, 5, 6, 9, 10, 11, 12],
  "fiore di zucca": [6, 7, 8, 9],
  "fragola": [3, 4, 5, 6, 7],
  "fungo": [1, 9, 10, 11, 12],
  "indivia": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  "kiwi": [1, 2, 3, 4, 10, 11],
  "lampone": [5, 6, 7, 8, 9],
  "lattuga": [3, 4, 5, 6, 7, 8, 9, 10, 11],
  "lenticchia": [8],
  "limone": [1, 2, 3, 4, 9, 10, 11, 12],
  "mais dolce": [7, 8, 9, 10],
  "mandarancio": [1, 2],
  "mandarino": [1, 2, 11, 12],
  "mandorla": [6, 7, 8],
  "mela": [1, 2, 3, 4, 8, 9, 10, 11, 12],
  "melanzana": [5, 6, 7, 8, 9],
  "melograno": [9, 10, 11],
  "melone": [6, 7, 8, 9],
  "mirtillo": [6, 7, 8],
  "mora": [7, 8, 9],
  "nespola giapponese": [5, 6],
  "nocciola": [6, 7],
  "noce": [10, 11, 12],
  "oliva da tavola": [2, 4, 5, 6, 7, 9, 10, 11, 12],
  "patata": [1, 2, 10, 11, 12],
  "patata novella": [3, 4, 5],
  "peperone": [6, 7, 8, 9, 10],
  "pera": [1, 2, 3, 4, 7, 8, 9, 10],
  "pesca": [6, 7, 8, 9],
  "pinolo": [1, 2, 11, 12],
  "pisello": [4, 5, 6],
  "pomodoro": [6, 7, 8, 9],
  "pompelmo": [1, 2, 3, 12],
  "porro": [7, 8, 9, 10, 11],
  "prugna": [6, 7, 8, 9],
  "puntarella": [2, 3, 4, 5, 9, 10, 11, 12],
  "radicchio": [1, 2, 3, 4, 10, 11, 12],
  "ravanello": [3, 4, 5, 6, 7, 8],
  "ribes": [6, 7, 8],
  "rucola": [3, 4, 5, 6, 7, 8],
  "scarola": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  "sedano": [1, 2, 3, 4, 9, 10, 11, 12],
  "spinacio": [2, 3, 4, 8, 9, 10],
  "taccola": [6, 7, 8],
  "topinambur": [1, 9, 10, 11, 12],
  "uva": [8, 9, 10],
  "zucca": [1, 2, 7, 8, 9, 10, 11, 12],
  "zucchina": [6, 7, 8, 9],
};

/** Entries the calendar's own note says keep after harvest, so they may be listed outside its months. */
const STORED = new Set(["arancia", "mela", "pera", "aglio", "cipolla", "fagiolo", "lenticchia", "patata"]);

/** Common produce grown in Italy that the calendar does not name, so its months have no official source. */
const OUTSIDE_CALENDAR = [
  "alloro",
  "barbabietola rossa",
  "cavoletti di bruxelles",
  "cavolo rapa",
  "cavolo rosso",
  "chinotto",
  "clementina",
  "cotogna",
  "dragoncello",
  "erba cipollina",
  "maggiorana",
  "menta",
  "nepitella",
  "origano",
  "patata dolce",
  "peperoncino",
  "prezzemolo",
  "rabarbaro",
  "rafano",
  "rapa",
  "rosmarino",
  "salvia",
  "scalogno",
  "sedano rapa",
  "timo",
  "visciola",
  "zafferano",
];

describe("seasons checked against the national calendar", () => {
  const grown = all.filter((item) => !item.isImported);
  const listed = grown.filter((item) => !OUTSIDE_CALENDAR.includes(item.name));

  it("lists every grown entry either in the national calendar or in the exact outside list", () => {
    const expected = [...Object.keys(NATIONAL_CALENDAR), ...OUTSIDE_CALENDAR].sort();
    expect(grown.map((item) => item.name).sort()).toEqual(expected);
  });

  it.each(listed.map((item) => [item.name, item] as const))("%s shows every month the calendar lists", (name, item) => {
    const shown = [...item.peak, ...(item.shoulder ?? [])];
    expect(shown).toEqual(expect.arrayContaining(NATIONAL_CALENDAR[name]));
  });

  it.each(listed.filter((item) => !STORED.has(item.name)).map((item) => [item.name, item] as const))(
    "%s peaks only in calendar months, bridging a single missing month",
    (name, item) => {
      const months = NATIONAL_CALENDAR[name];
      for (const month of item.peak) {
        const bridged = months.includes((month % 12) + 1) && months.includes(((month + 10) % 12) + 1);
        expect(months.includes(month) || bridged, `${name} ${month}`).toBe(true);
      }
    },
  );

  it.each(listed.filter((item) => !STORED.has(item.name)).map((item) => [item.name, item] as const))(
    "%s has shoulder months only from the calendar",
    (name, item) => {
      for (const month of item.shoulder ?? []) expect(NATIONAL_CALENDAR[name], `${name} ${month}`).toContain(month);
    },
  );

  it("marks exactly the produce not grown in Italy as imported", () => {
    expect(all.filter((item) => item.isImported).map((item) => item.name)).toEqual([
      "ananas",
      "avocado",
      "banana",
      "cocco",
      "dattero",
      "frutto della passione",
      "litchi",
      "mango",
      "papaya",
    ]);
  });
});

describe("data invariants", () => {
  it("holds only months from 1 to 12 and a non-empty peak on every entry", () => {
    for (const it of all) {
      expect(it.peak.length, it.name).toBeGreaterThan(0);
      for (const m of [...it.peak, ...(it.shoulder ?? [])]) {
        expect(Number.isInteger(m) && m >= 1 && m <= 12, `${it.name} ${m}`).toBe(true);
      }
    }
  });

  it("never lists a month as both peak and shoulder", () => {
    for (const it of all) {
      expect(it.peak.filter((m) => it.shoulder?.includes(m)), it.name).toEqual([]);
    }
  });

  it("has no duplicate name across both lists", () => {
    expect(new Set(all.map((it) => it.name)).size).toBe(all.length);
  });

  it("keeps each list in Italian alphabetical order", () => {
    const collator = new Intl.Collator("it");
    for (const list of [fruits, vegetables]) {
      const names = list.map((it) => it.name);
      expect(names).toEqual([...names].sort(collator.compare));
    }
  });

  it("leaves no calendar month without produce at peak", () => {
    for (let m = 1; m <= 12; m++) expect(peakItems(all, m).length, `month ${m}`).toBeGreaterThan(0);
  });
});

describe("isInSeason", () => {
  const item: Item = { name: "x", peak: [6], shoulder: [5] };

  it("tells peak, shoulder and off apart", () => {
    expect(isInSeason(item, 6)).toBe("peak");
    expect(isInSeason(item, 5)).toBe("shoulder");
    expect(isInSeason(item, 7)).toBe("off");
  });

  it("treats a missing shoulder as off", () => {
    expect(isInSeason({ name: "y", peak: [1] }, 2)).toBe("off");
  });
});

describe("peakItems", () => {
  it("keeps entries at peak and drops imported or shoulder ones", () => {
    const items: Item[] = [
      { name: "a", peak: [3] },
      { name: "b", peak: [3], isImported: true },
      { name: "c", peak: [4], shoulder: [3] },
    ];
    expect(peakItems(items, 3).map((it) => it.name)).toEqual(["a"]);
  });
});

describe("calendar coverage", () => {
  it("offers Italian fruit and vegetables at peak in every month", () => {
    for (let month = 1; month <= 12; month++) {
      expect(peakItems(fruits, month).length).toBeGreaterThan(0);
      expect(peakItems(vegetables, month).length).toBeGreaterThan(0);
    }
  });
});
