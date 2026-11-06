import { createHash } from "node:crypto";
import type { Plugin } from "vite";

/** Inline script tags of the built page. */
const INLINE_SCRIPT = /<script>([\s\S]*?)<\/script>/g;
/** Charset tag, the policy goes right after it. */
const CHARSET_TAG = /<meta charset="[^"]*"\s*\/?>/;

/**
 * Add a Content-Security-Policy meta tag allowing same-origin resources and the page's own inline scripts.
 * @param html Final page markup.
 * @returns Markup with the policy right after the charset tag, ahead of every script.
 * @throws Error when the page has no charset tag to anchor the policy.
 */
export function injectCsp(html: string): string {
  if (!CHARSET_TAG.test(html)) throw new Error("page has no charset meta tag");
  const hashes = [...html.matchAll(INLINE_SCRIPT)].map(
    ([, body]) => `'sha256-${createHash("sha256").update(body).digest("base64")}'`
  );
  const policy = [
    "default-src 'none'",
    `script-src ${["'self'", ...hashes].join(" ")}`,
    "style-src 'self'",
    "font-src 'self'",
    "img-src 'self'",
    "base-uri 'none'",
    "form-action 'none'",
  ].join("; ");
  const tag = `<meta http-equiv="Content-Security-Policy" content="${policy};" />`;
  return html.replace(CHARSET_TAG, (charset) => `${charset}\n    ${tag}`);
}

/**
 * Build-only Vite plugin applying {@link injectCsp}, since the dev server needs inline styles and a socket.
 * @returns Vite plugin.
 */
export function contentSecurityPolicy(): Plugin {
  return {
    name: "content-security-policy",
    apply: "build",
    transformIndexHtml: { order: "post", handler: injectCsp },
  };
}
