import { useEffect, useState } from "react";

export type Mode = "light" | "dark";

const COOKIE = "mode";
const ONE_YEAR = 60 * 60 * 24 * 365;

function readCookie(): Mode | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(/(?:^|; )mode=([^;]+)/);
  if (!m) return null;
  const v = decodeURIComponent(m[1]);
  return v === "dark" || v === "light" ? v : null;
}

function applyMode(next: Mode) {
  document.documentElement.classList.toggle("dark", next === "dark");
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", next === "dark" ? "#16191b" : "#f4ecdb");
}

function writeCookie(next: Mode) {
  document.cookie = `${COOKIE}=${next}; path=/; max-age=${ONE_YEAR}; samesite=strict`;
}

export function useTheme() {
  const [mode, setMode] = useState<Mode>(() => {
    if (typeof document === "undefined") return "light";
    return document.documentElement.classList.contains("dark") ? "dark" : "light";
  });

  useEffect(() => {
    if (readCookie()) return;
    if (!window.matchMedia) return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      if (readCookie()) return;
      const next: Mode = e.matches ? "dark" : "light";
      setMode(next);
      applyMode(next);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const toggle = () => {
    const next: Mode = mode === "dark" ? "light" : "dark";
    setMode(next);
    applyMode(next);
    writeCookie(next);
  };

  return { mode, toggle };
}
