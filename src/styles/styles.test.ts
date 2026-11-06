import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import copy from "../copy.it.json";
import { fruits, vegetables } from "../data/seasonal";

const read = (path: string) => readFileSync(new URL(path, import.meta.url), "utf8");
const files = [...read("./index.css").matchAll(/@import "(.+)"/g)].map((m) => [m[1], read(m[1])] as const);
const css = files.map(([, text]) => text).join("\n");
const fonts = read("./fonts.css");

/** Build the character test for the range of the shipped latin font subsets, plus the symbols left to system fonts. */
const LATIN = /^[\u0000-ÿıŒœ -⁯€™↑↓−∕❦←→]*$/u;

describe("stylesheet", () => {
  it("turns off animation and transition under a reduced-motion preference", () => {
    const block = css.match(/@media \(prefers-reduced-motion: reduce\) \{[^@]*\}/)?.[0] ?? "";
    expect(block).toMatch(/animation-duration:/);
    expect(block).toMatch(/transition-duration:/);
    expect(block).toMatch(/scroll-behavior: auto/);
  });

  it("keeps a focus ring on every control, dropping it only on headings focused by script", () => {
    expect(css).toMatch(/:focus-visible \{[^}]*outline: 2px solid/);
    const without = [...css.matchAll(/([^{}\n]+)\{[^}]*outline: none/g)].map((m) => m[1].trim());
    expect(without.sort()).toEqual([".cover__title:focus", ".curtain__title:focus"]);
  });

  it("enlarges the small controls for touch", () => {
    expect(css).toMatch(/@media \(pointer: coarse\) \{[^@]*\.name[^@]*\.banner__read/);
  });

  it("puts the phone block of each file after the base rules it overrides", () => {
    const phone = files.filter(([, text]) => text.includes("@media (max-width: 640px)"));
    expect(phone.length).toBeGreaterThan(0);
    for (const [, text] of phone) {
      const after = text.slice(text.indexOf("@media (max-width: 640px)"));
      expect(after.match(/\n\}/g)).toHaveLength(1);
      expect(after.trimEnd().endsWith("\n}")).toBe(true);
    }
  });

  it("keeps a list comma on the line of its name by making the item a flex box", () => {
    const item = css.match(/\.names-inline li \{[^}]*\}/)?.[0] ?? "";
    expect(item).toMatch(/display: inline-flex/);
    expect(css).toMatch(/\.names-inline li:not\(:last-child\)::after \{ content: ","; \}/);
  });

  it("keeps the title and the accept button of the gate outside its scrolling text", () => {
    const panel = css.match(/\.gate__panel \{[^}]*\}/)?.[0] ?? "";
    expect(panel).toMatch(/flex-direction: column/);
    expect(panel).toMatch(/max-height: calc\(100dvh/);
    expect(css.match(/\.gate__body \{[^}]*\}/)?.[0]).toMatch(/overflow: auto/);
    expect(css.match(/\.gate__foot \{[^}]*\}/)?.[0]).toMatch(/flex: none/);
    expect(css.match(/\.gate__head \{[^}]*\}/)?.[0]).toMatch(/flex: none/);
  });

  it("offers no dark theme", () => {
    expect(css).not.toContain("prefers-color-scheme");
    expect(css).not.toContain(".dark");
    expect(css).toMatch(/color-scheme: light/);
  });
});

describe("theme colour", () => {
  it("matches the page paper", () => {
    const paper = css.match(/--paper: (#[0-9a-f]+);/)![1];
    expect(read("../../index.html")).toContain(`<meta name="theme-color" content="${paper}"`);
  });
});

describe("fonts", () => {
  it("ships latin woff2 faces only", () => {
    const sources = [...fonts.matchAll(/url\("([^"]+)"\)/g)].map((m) => m[1]);
    expect(sources).toHaveLength(4);
    for (const src of sources) expect(src).toMatch(/-latin-(\d+|opsz)-normal\.woff2$/);
    expect(fonts).toMatch(/font-display: swap/);
  });

  it("covers every character of the copy and the produce names", () => {
    const text = JSON.stringify(copy) + [...fruits, ...vegetables].map((item) => item.name).join("");
    expect(text).toMatch(LATIN);
  });
});
