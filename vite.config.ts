import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { contentSecurityPolicy } from "./build/csp.ts";
import { licenseNotices } from "./build/licenseNotices.ts";

/** Build, dev server and test settings. */
export default defineConfig({
  base: "/SeasonalItaly/",
  plugins: [react(), licenseNotices(import.meta.dirname), contentSecurityPolicy()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  build: {
    assetsInlineLimit: 0,
  },
  test: {
    environment: "jsdom",
    restoreMocks: true,
    coverage: {
      provider: "v8",
      include: ["src/**/*.{ts,tsx}", "build/**/*.ts"],
      exclude: ["**/*.test.{ts,tsx}"],
      thresholds: { 100: true },
    },
  },
});
