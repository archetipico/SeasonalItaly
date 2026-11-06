import { readFileSync } from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";

/** Packages whose code or font files end up in the published site. */
export const SHIPPED_PACKAGES = [
  "@fontsource-variable/fraunces",
  "@fontsource/figtree",
  "react",
  "react-dom",
  "scheduler",
] as const;

/**
 * Join each shipped package's licence text into one notices document.
 * @param readLicense returns the LICENSE text of a package name
 * @returns the document, one titled section per package
 */
export function buildNotices(readLicense: (pkg: string) => string): string {
  return SHIPPED_PACKAGES.map((pkg) => `${pkg}\n${"=".repeat(pkg.length)}\n\n${readLicense(pkg).trim()}\n`).join("\n");
}

/** Append to the built page a comment carrying the texts MIT and OFL-1.1 require in each copy. */
export function licenseNotices(root: string): Plugin {
  return {
    name: "license-notices",
    apply: "build",
    transformIndexHtml: {
      order: "post",
      handler(html) {
        const notices = buildNotices((pkg) => readFileSync(path.join(root, "node_modules", pkg, "LICENSE"), "utf8"));
        return `${html}\n<!--\n${notices}-->\n`;
      },
    },
  };
}
