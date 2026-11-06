import copy from "@/copy.it.json";

/** Every product string of the site. */
export { copy };

/**
 * Fill the `{{name}}` slots of a copy string.
 * @param template Copy string.
 * @param vars Value for each slot.
 * @returns String with every known slot replaced.
 */
export function fill(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (slot, name: string) => String(vars[name] ?? slot));
}

/**
 * Word a count of entries.
 * @param n Number of entries.
 * @returns Count with the noun in the right number.
 */
export function countLabel(n: number): string {
  return fill(n === 1 ? copy.search.countOne : copy.search.count, { n });
}

/**
 * Name a month.
 * @param month Month, 1-indexed.
 * @returns Full lower-case name.
 */
export function monthName(month: number): string {
  return copy.months.long[month - 1];
}

/**
 * Word a set of months in the order given.
 * @param months Months, 1-indexed.
 * @returns Names joined as a sentence, or the all-year wording for all twelve.
 */
export function sayMonths(months: number[]): string {
  if (months.length === 12) return copy.sheet.allYear;
  const names = months.map(monthName);
  const last = names.pop()!;
  return names.length ? `${names.join(", ")} ${copy.sheet.and} ${last}` : last;
}
