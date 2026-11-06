// @vitest-environment node
import { describe, expect, it } from "vitest";
import pkg from "../package.json";
import { buildNotices, licenseNotices, SHIPPED_PACKAGES } from "./licenseNotices";

describe("buildNotices", () => {
  it("includes a titled section with the licence text of each shipped package", () => {
    const out = buildNotices((name) => `text of ${name}`);
    for (const name of SHIPPED_PACKAGES) {
      expect(out).toContain(`${name}\n${"=".repeat(name.length)}\n\ntext of ${name}\n`);
    }
  });
});

describe("licenseNotices", () => {
  const { handler } = licenseNotices(process.cwd()).transformIndexHtml as unknown as {
    handler: (html: string) => string;
  };
  const page = "<html><body></body></html>";
  const output = handler(page);

  it("keeps the page and appends the real MIT and OFL texts in one comment", () => {
    expect(output.startsWith(`${page}\n<!--\n`)).toBe(true);
    expect(output.endsWith("-->\n")).toBe(true);
    expect(output).toContain("Permission is hereby granted, free of charge");
    expect(output).toContain("SIL OPEN FONT LICENSE Version 1.1");
  });

  it("holds no sequence that would close the comment early", () => {
    const body = output.slice(`${page}\n<!--\n`.length, -"-->\n".length);
    expect(body).not.toMatch(/-->|--!>|<!--/);
  });
});

describe("SHIPPED_PACKAGES", () => {
  it("covers every runtime dependency, plus scheduler pulled in by react-dom", () => {
    const shippedRuntime = Object.keys(pkg.dependencies).filter((d) => /^(react|react-dom|@fontsource(-variable)?\/.*)$/.test(d));
    expect([...SHIPPED_PACKAGES].sort()).toEqual([...shippedRuntime, "scheduler"].sort());
  });
});
