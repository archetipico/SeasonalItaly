/** Colours of one month: background, text on it, the two shape colours. Shape colour a doubles as heading colour on paper. */
export type MonthColours = { bg: string; ink: string; a: string; b: string };

/** Colours of each month, January first. */
export const MONTH_COLOURS: MonthColours[] = [
  { bg: "#dbe5ec", ink: "#1f3347", a: "#2f5d82", b: "#b0702a" },
  { bg: "#f0dfe2", ink: "#4a2233", a: "#a0405f", b: "#4a7359" },
  { bg: "#e6ebcb", ink: "#2c3a1e", a: "#587a31", b: "#8a5a8e" },
  { bg: "#dbebe1", ink: "#1d3a2f", a: "#2f7555", b: "#b0506a" },
  { bg: "#f5e0da", ink: "#4a241f", a: "#b84d43", b: "#4a7656" },
  { bg: "#f6e8bf", ink: "#44330f", a: "#ad5a26", b: "#47745a" },
  { bg: "#f6dac8", ink: "#43210f", a: "#ad452c", b: "#2c6a65" },
  { bg: "#d2e7e1", ink: "#143a35", a: "#1f7063", b: "#ab512d" },
  { bg: "#e4dcec", ink: "#33234a", a: "#6c4a96", b: "#99662a" },
  { bg: "#f4dfc4", ink: "#40260c", a: "#a54f1c", b: "#4e6b3a" },
  { bg: "#ecdbdf", ink: "#40202e", a: "#8a3553", b: "#9c6222" },
  { bg: "#d7e5db", ink: "#17352a", a: "#2a6650", b: "#ad483d" },
];

/**
 * Build the CSS variables that colour a page section for a month.
 * @param month Month, 1-indexed.
 * @returns Variable values, ready for a style prop.
 */
export function monthStyle(month: number): Record<string, string> {
  const { bg, ink, a, b } = MONTH_COLOURS[month - 1];
  return { "--bg": bg, "--ink": ink, "--a": a, "--b": b };
}
