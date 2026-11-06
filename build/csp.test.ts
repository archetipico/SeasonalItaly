// @vitest-environment node
import { describe, expect, it } from "vitest";
import config from "../vite.config";
import { injectCsp } from "./csp";

const HEAD = '<html><head><meta charset="UTF-8" /><title>x</title>';

describe("injectCsp", () => {
  it("hashes an inline script with the value published in the CSP documentation", () => {
    const html = injectCsp(`${HEAD}<script>alert('Hello, world.');</script></head></html>`);
    expect(html).toContain("'sha256-qznLcsROx4GACP2dm0UCKCzCG+HiZ1guq6ZZDob/Tng='");
  });

  it("places the policy before the first script so it governs it", () => {
    const html = injectCsp(`${HEAD}<script>let a;</script></head></html>`);
    expect(html.indexOf("Content-Security-Policy")).toBeGreaterThan(-1);
    expect(html.indexOf("Content-Security-Policy")).toBeLessThan(html.indexOf("<script>"));
  });

  it("ignores external scripts and allows only same-origin sources without inline styles", () => {
    const html = injectCsp(`${HEAD}<script type="module" src="/a.js"></script></head></html>`);
    expect(html).not.toContain("sha256-");
    expect(html).toContain("default-src 'none'");
    expect(html).toContain("script-src 'self'");
    expect(html).toContain("style-src 'self';");
    expect(html).not.toContain("unsafe-inline");
  });

  it("refuses a page with no charset tag to anchor the policy", () => {
    expect(() => injectCsp("<html><head></head></html>")).toThrow(/charset/);
  });
});

describe("build config", () => {
  it("never inlines assets as data URLs, which the page's font policy would block", () => {
    expect(config.build?.assetsInlineLimit).toBe(0);
  });

  it("requires full coverage", () => {
    expect(config.test?.coverage?.thresholds).toEqual({ 100: true });
  });
});
