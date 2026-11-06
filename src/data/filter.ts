import type { Item } from "@/data/seasonal";

/**
 * Fold text so that a search ignores case, accents, apostrophe style and extra spaces.
 * @param text Raw text.
 * @returns Folded text.
 */
export function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[‘’ʼ`´]/g, "'")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");
}

/**
 * Keep the entries whose name holds the search text.
 * @param items Entries to search.
 * @param query Search text, as typed.
 * @returns Matching entries, in their original order.
 */
export function searchItems(items: Item[], query: string): Item[] {
  const needle = normalize(query);
  return items.filter((item) => normalize(item.name).includes(needle));
}
