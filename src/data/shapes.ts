import { fruits, vegetables, peakItems } from "@/data/seasonal";

/** Name of one produce illustration. */
export type ShapeKey = "limone" | "arancia" | "pera" | "mela" | "ciliegia" | "fico" | "cachi" | "uva" | "pomodoro" | "melanzana" | "carciofo" | "carota" | "pisello" | "zucchina" | "castagna" | "fragola" | "pesca" | "anguria" | "zucca" | "asparago" | "cavolo" | "broccolo" | "peperone" | "kiwi" | "finocchio" | "spinacio" | "ravanello";

/** Illustration of each produce name, first match wins. */
export const SHAPES: [ShapeKey, RegExp][] = [
  ["limone", /^limone$/],
  ["arancia", /^(arancia|mandarino)$/],
  ["pera", /^pera$/],
  ["mela", /^mela$/],
  ["ciliegia", /^ciliegia$/],
  ["fico", /^fico$/],
  ["cachi", /^cachi$/],
  ["uva", /^uva$/],
  ["pomodoro", /^pomodoro$/],
  ["melanzana", /^melanzana$/],
  ["carciofo", /^carciofo$/],
  ["carota", /^carota$/],
  ["pisello", /^(pisello|fava)$/],
  ["zucchina", /^zucchina$/],
  ["castagna", /^castagna$/],
  ["fragola", /^fragola$/],
  ["pesca", /^(pesca|albicocca)$/],
  ["anguria", /^anguria$/],
  ["zucca", /^zucca$/],
  ["asparago", /^asparago$/],
  ["cavolo", /^(cavolo|radicchio)/],
  ["broccolo", /^(broccolo|cavolfiore)/],
  ["peperone", /^peperone$/],
  ["kiwi", /^kiwi$/],
  ["finocchio", /^finocchio$/],
  ["spinacio", /^spinacio$/],
  ["ravanello", /^ravanello$/],
];

/** Illustrations shown on a month's cover. */
export const COVER_SIZE = 6;

/**
 * Find the illustration of a produce name.
 * @param name Produce name.
 * @returns Illustration, or null when none is drawn for it.
 */
export function shapeOf(name: string): ShapeKey | null {
  return SHAPES.find(([, pattern]) => pattern.test(name))?.[0] ?? null;
}

/**
 * List the distinct illustrations of a set of entries at peak in a month.
 * @param items Entries of one kind.
 * @param month Month, 1-indexed.
 * @returns Illustrations in data order.
 */
function shapesAtPeak(items: typeof fruits, month: number): ShapeKey[] {
  const found = peakItems(items, month).map((item) => shapeOf(item.name));
  return [...new Set(found.filter((shape) => shape !== null))];
}

/**
 * Pick a month's cover illustrations, only from Italian produce at peak in that month, fruit and vegetables taking turns.
 * @param month Month, 1-indexed.
 * @returns Up to six distinct illustrations.
 */
export function monthShapes(month: number): ShapeKey[] {
  const fruit = shapesAtPeak(fruits, month);
  const veg = shapesAtPeak(vegetables, month);
  const picked = new Set<ShapeKey>();
  for (let turn = 0; picked.size < COVER_SIZE && turn < COVER_SIZE * 2; turn++) {
    const shape = (turn % 2 ? veg : fruit)[(turn >> 1) + (month % 2)];
    if (shape) picked.add(shape);
  }
  for (const shape of [...fruit, ...veg]) if (picked.size < COVER_SIZE) picked.add(shape);
  return [...picked];
}
