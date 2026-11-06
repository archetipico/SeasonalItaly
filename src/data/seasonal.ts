/** Standing of an entry in a month. */
export type SeasonState = "peak" | "shoulder" | "off";

/** One produce entry of the calendar. */
export type Item = {
  name: string;
  /** Months at peak of season, 1-indexed. */
  peak: number[];
  /** Months still available but not at peak (early or late season, storage). */
  shoulder?: number[];
  /** True when not grown in Italy at commercial scale and normally imported. */
  isImported?: boolean;
};

/** Every fruit, sorted by name. */
export const fruits: Item[] = [
  { name: "albicocca", peak: [6, 7], shoulder: [8] },
  { name: "amarena", peak: [6], shoulder: [5] },
  { name: "ananas", peak: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], isImported: true },
  { name: "anguria", peak: [7, 8], shoulder: [6, 9] },
  { name: "arancia", peak: [12, 1, 2, 3], shoulder: [4, 11] },
  { name: "avocado", peak: [11, 12, 1, 2], shoulder: [3, 10], isImported: true },
  { name: "banana", peak: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], isImported: true },
  { name: "bergamotto", peak: [12, 1, 2], shoulder: [10, 11] },
  { name: "cachi", peak: [10, 11] },
  { name: "castagna", peak: [10, 11], shoulder: [12] },
  { name: "cedro", peak: [11, 12], shoulder: [10] },
  { name: "chinotto", peak: [11, 12, 1], shoulder: [10, 2] },
  { name: "ciliegia", peak: [5, 6], shoulder: [7] },
  { name: "clementina", peak: [11, 12, 1], shoulder: [10, 2] },
  { name: "cocco", peak: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], isImported: true },
  { name: "cotogna", peak: [10, 11], shoulder: [9, 12] },
  { name: "dattero", peak: [10, 11, 12, 1], shoulder: [9, 2], isImported: true },
  { name: "fico", peak: [7, 8, 9] },
  { name: "fico d'india", peak: [9, 10], shoulder: [8] },
  { name: "fragola", peak: [5, 6], shoulder: [3, 4, 7] },
  { name: "frutto della passione", peak: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], isImported: true },
  { name: "kiwi", peak: [11, 12, 1, 2], shoulder: [3, 4, 10] },
  { name: "lampone", peak: [6, 7, 8], shoulder: [5, 9] },
  { name: "limone", peak: [11, 12, 1, 2, 3, 4], shoulder: [9, 10] },
  { name: "litchi", peak: [12, 1, 2], shoulder: [11, 3], isImported: true },
  { name: "mandarancio", peak: [1], shoulder: [2] },
  { name: "mandarino", peak: [11, 12, 1, 2] },
  { name: "mandorla", peak: [8], shoulder: [6, 7] },
  { name: "mango", peak: [8, 9, 10], shoulder: [7, 11], isImported: true },
  { name: "mela", peak: [9, 10, 11], shoulder: [1, 2, 3, 4, 8, 12] },
  { name: "melograno", peak: [10, 11], shoulder: [9] },
  { name: "melone", peak: [7, 8], shoulder: [6, 9] },
  { name: "mirtillo", peak: [7, 8], shoulder: [6] },
  { name: "mora", peak: [7, 8], shoulder: [9] },
  { name: "nespola giapponese", peak: [5], shoulder: [6] },
  { name: "nocciola", peak: [6, 7] },
  { name: "noce", peak: [10, 11], shoulder: [12] },
  { name: "papaya", peak: [10, 11, 12, 1], shoulder: [9, 2], isImported: true },
  { name: "pera", peak: [8, 9, 10], shoulder: [1, 2, 3, 4, 7, 11, 12] },
  { name: "pesca", peak: [7, 8], shoulder: [6, 9] },
  { name: "pinolo", peak: [11], shoulder: [1, 2, 12] },
  { name: "pompelmo", peak: [12, 1, 2], shoulder: [3] },
  { name: "prugna", peak: [7, 8, 9], shoulder: [6] },
  { name: "ribes", peak: [6, 7], shoulder: [8] },
  { name: "uva", peak: [8, 9, 10] },
  { name: "visciola", peak: [6, 7], shoulder: [5, 8] },
];

/** Every vegetable, sorted by name. */
export const vegetables: Item[] = [
  { name: "aglio", peak: [6, 7], shoulder: [1, 2, 3, 4, 5, 8, 9, 10, 11, 12] },
  { name: "agretto", peak: [3, 4, 5], shoulder: [6] },
  { name: "alloro", peak: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
  { name: "asparago", peak: [4, 5], shoulder: [3, 6] },
  { name: "barbabietola rossa", peak: [9, 10, 11], shoulder: [6, 7, 8, 12] },
  { name: "basilico", peak: [6, 7] },
  { name: "bieta", peak: [5, 6, 7, 8, 9, 10], shoulder: [11] },
  { name: "broccolo", peak: [10, 11, 12, 1, 2], shoulder: [3, 4, 5, 6, 9] },
  { name: "broccolo romanesco", peak: [10, 11, 12], shoulder: [5, 6, 7, 8, 9] },
  { name: "carciofo", peak: [3, 4, 5], shoulder: [6] },
  { name: "cardo", peak: [11, 12, 1, 2] },
  { name: "carota", peak: [9, 10], shoulder: [1, 2, 3, 11, 12] },
  { name: "catalogna", peak: [11, 12, 1, 2], shoulder: [3, 4, 5, 9, 10] },
  { name: "cavoletti di bruxelles", peak: [11, 12, 1], shoulder: [10, 2] },
  { name: "cavolfiore", peak: [10, 11, 12, 1, 2], shoulder: [3, 4, 5, 7, 9] },
  { name: "cavolo cappuccio", peak: [10, 11, 12, 1, 2, 3], shoulder: [4, 9] },
  { name: "cavolo nero", peak: [11, 12, 1, 2, 3] },
  { name: "cavolo rapa", peak: [10, 11, 12, 1, 2], shoulder: [9, 3] },
  { name: "cavolo rosso", peak: [10, 11, 12, 1, 2], shoulder: [9, 3] },
  { name: "cavolo verza", peak: [10, 11, 12, 1, 2, 3], shoulder: [4, 9] },
  { name: "cetriolo", peak: [6, 7, 8], shoulder: [9] },
  { name: "cicoria", peak: [1, 2, 3], shoulder: [4, 5, 6, 7] },
  { name: "cima di rapa", peak: [11, 12, 1, 2], shoulder: [3] },
  { name: "cipolla", peak: [5, 6, 7], shoulder: [2, 3, 4, 8, 9, 10, 11, 12] },
  { name: "cipollotto", peak: [4, 5], shoulder: [3] },
  { name: "dragoncello", peak: [5, 6, 7, 8, 9], shoulder: [4, 10] },
  { name: "erba cipollina", peak: [4, 5, 6, 7], shoulder: [3, 8, 9] },
  { name: "fagiolino", peak: [6, 7, 8], shoulder: [3, 4, 5, 9, 10] },
  { name: "fagiolo", peak: [8, 9, 10], shoulder: [6, 7, 11] },
  { name: "fava", peak: [5, 6] },
  { name: "finocchio", peak: [11, 12, 1, 2, 3, 4], shoulder: [5, 6, 9, 10] },
  { name: "fiore di zucca", peak: [6, 7, 8], shoulder: [9] },
  { name: "fungo", peak: [9, 10, 11], shoulder: [12, 1] },
  { name: "indivia", peak: [10, 11, 12, 1, 2], shoulder: [3, 4, 5, 6, 7, 8, 9] },
  { name: "lattuga", peak: [5, 6, 7, 8, 9], shoulder: [3, 4, 10, 11] },
  { name: "lenticchia", peak: [8], shoulder: [7] },
  { name: "maggiorana", peak: [6, 7, 8, 9], shoulder: [5, 10] },
  { name: "mais dolce", peak: [7, 8, 9], shoulder: [10] },
  { name: "melanzana", peak: [7, 8, 9], shoulder: [5, 6] },
  { name: "menta", peak: [5, 6, 7, 8, 9], shoulder: [4, 10] },
  { name: "nepitella", peak: [5, 6, 7, 8, 9], shoulder: [4, 10] },
  { name: "oliva da tavola", peak: [10, 11], shoulder: [2, 4, 5, 6, 7, 9, 12] },
  { name: "origano", peak: [6, 7, 8], shoulder: [5, 9] },
  { name: "patata", peak: [6, 7, 8, 9, 10], shoulder: [1, 2, 5, 11, 12] },
  { name: "patata dolce", peak: [10, 11, 12], shoulder: [9, 1, 2] },
  { name: "patata novella", peak: [4, 5], shoulder: [3] },
  { name: "peperoncino", peak: [7, 8, 9, 10], shoulder: [6, 11] },
  { name: "peperone", peak: [7, 8, 9], shoulder: [6, 10] },
  { name: "pisello", peak: [4, 5, 6] },
  { name: "pomodoro", peak: [6, 7, 8, 9] },
  { name: "porro", peak: [9, 10, 11], shoulder: [7, 8] },
  { name: "prezzemolo", peak: [4, 5, 6, 7, 8, 9, 10], shoulder: [3, 11] },
  { name: "puntarella", peak: [11, 12, 1, 2], shoulder: [3, 4, 5, 9, 10] },
  { name: "rabarbaro", peak: [5, 6, 7], shoulder: [4, 8] },
  { name: "radicchio", peak: [10, 11, 12, 1, 2], shoulder: [3, 4] },
  { name: "rafano", peak: [11, 12, 1, 2, 3], shoulder: [10] },
  { name: "rapa", peak: [11, 12, 1], shoulder: [10, 2] },
  { name: "ravanello", peak: [4, 5, 6, 7], shoulder: [3, 8] },
  { name: "rosmarino", peak: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
  { name: "rucola", peak: [4, 5, 6, 7, 8], shoulder: [3] },
  { name: "salvia", peak: [5, 6, 7, 8, 9], shoulder: [4, 10] },
  { name: "scalogno", peak: [7, 8], shoulder: [6, 9] },
  { name: "scarola", peak: [10, 11, 12, 1, 2], shoulder: [3, 4, 5, 6, 7, 8, 9] },
  { name: "sedano", peak: [9, 10, 11], shoulder: [1, 2, 3, 4, 12] },
  { name: "sedano rapa", peak: [10, 11, 12], shoulder: [9, 1] },
  { name: "spinacio", peak: [10, 2, 3], shoulder: [4, 8, 9] },
  { name: "taccola", peak: [6], shoulder: [7, 8] },
  { name: "timo", peak: [5, 6, 7, 8, 9], shoulder: [4, 10] },
  { name: "topinambur", peak: [10, 11, 12, 1], shoulder: [9] },
  { name: "zafferano", peak: [10, 11], shoulder: [9] },
  { name: "zucca", peak: [10, 11, 12], shoulder: [1, 2, 7, 8, 9] },
  { name: "zucchina", peak: [6, 7, 8], shoulder: [9] },
];

/**
 * Tell how an entry stands in a month.
 * @param item Entry to check.
 * @param month Month, 1-indexed.
 * @returns Season state in that month.
 */
export function isInSeason(item: Item, month: number): SeasonState {
  if (item.peak.includes(month)) return "peak";
  if (item.shoulder?.includes(month)) return "shoulder";
  return "off";
}

/**
 * List the entries grown in Italy that are at peak in a month.
 * @param items Entries to filter.
 * @param month Month, 1-indexed.
 * @returns Matching entries, in their original order.
 */
export function peakItems(items: Item[], month: number): Item[] {
  return items.filter((it) => !it.isImported && it.peak.includes(month));
}
