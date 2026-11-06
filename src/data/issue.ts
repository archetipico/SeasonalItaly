import { fruits, vegetables, peakItems, type Item } from "@/data/seasonal";

/** Lists shown for one month. */
export type Issue = {
  /** Italian fruit at peak. */
  fruit: Item[];
  /** Italian vegetables at peak. */
  veg: Item[];
  /** Italian entries in shoulder season that reach their peak next month. */
  soon: Item[];
  /** Italian entries in shoulder season that do not. */
  ending: Item[];
  /** Imported entries at peak. */
  away: Item[];
};

/**
 * Step to the following month, wrapping at the end of the year.
 * @param month Month, 1-indexed.
 * @returns Following month, 1-indexed.
 */
export function nextMonth(month: number): number {
  return (month % 12) + 1;
}

/**
 * Step to the preceding month, wrapping at the start of the year.
 * @param month Month, 1-indexed.
 * @returns Preceding month, 1-indexed.
 */
export function previousMonth(month: number): number {
  return ((month + 10) % 12) + 1;
}

/**
 * Split the produce into the lists of one month.
 * @param month Month, 1-indexed.
 * @returns Lists in data order.
 */
export function monthIssue(month: number): Issue {
  const all = [...fruits, ...vegetables];
  const shoulder = all.filter((item) => !item.isImported && item.shoulder?.includes(month));
  const following = nextMonth(month);
  return {
    fruit: peakItems(fruits, month),
    veg: peakItems(vegetables, month),
    soon: shoulder.filter((item) => item.peak.includes(following)),
    ending: shoulder.filter((item) => !item.peak.includes(following)),
    away: all.filter((item) => item.isImported && item.peak.includes(month)),
  };
}
