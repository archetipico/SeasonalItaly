import { useTranslation } from "react-i18next";
import { useMonths } from "@/lib/useMonths";
import { useTheme } from "@/lib/useTheme";

export function Header() {
  const { t } = useTranslation();
  const { long } = useMonths();
  const { mode, toggle } = useTheme();

  const now = new Date();
  const monthName = long[now.getMonth()];
  const day = now.getDate();
  const year = now.getFullYear();

  return (
    <header className="border-b border-line/15 bg-bg/85 backdrop-blur sticky top-0 z-30">
      <div className="container flex items-center justify-between gap-4 py-4">
        <a
          href="https://archetipico.github.io"
          aria-label={t("nav.homeTitle")}
          className="text-[13px] text-ink/60 hover:text-ink transition-colors inline-flex items-center gap-1.5"
        >
          <span aria-hidden>←</span>
          <span>{t("nav.home")}</span>
        </a>

        <h1 className="wordmark text-lg sm:text-xl inline-flex items-center gap-2">
          <span aria-hidden className="serif-italic text-basil text-2xl leading-none">❦</span>
          <span>{t("brand")}</span>
        </h1>

        <div className="flex items-center gap-3">
          <p className="hidden md:block text-[13px] text-ink/55 tabular-nums">
            {day} {monthName} {year}
          </p>
          <a
            href="#disclaimer"
            className="info-btn"
            aria-label={t("nav.disclaimerTitle")}
            title={t("nav.disclaimer")}
          >
            <span aria-hidden className="serif-italic">i</span>
          </a>
          <button
            type="button"
            onClick={toggle}
            className="theme-btn"
            data-mode={mode}
            aria-label={t("toggles.theme")}
            title={mode === "dark" ? t("toggles.light") : t("toggles.dark")}
          >
            <svg
              className="theme-btn__icon theme-btn__icon--sun"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <circle cx="12" cy="12" r="4" />
              <g className="theme-btn__rays">
                <line x1="12" y1="2.5" x2="12" y2="5" />
                <line x1="12" y1="19" x2="12" y2="21.5" />
                <line x1="2.5" y1="12" x2="5" y2="12" />
                <line x1="19" y1="12" x2="21.5" y2="12" />
                <line x1="5.2" y1="5.2" x2="6.9" y2="6.9" />
                <line x1="17.1" y1="17.1" x2="18.8" y2="18.8" />
                <line x1="5.2" y1="18.8" x2="6.9" y2="17.1" />
                <line x1="17.1" y1="6.9" x2="18.8" y2="5.2" />
              </g>
            </svg>
            <svg
              className="theme-btn__icon theme-btn__icon--moon"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path d="M19.2 14.8A8 8 0 0 1 9.2 4.8a0.6 0.6 0 0 0-0.8-0.75 9.2 9.2 0 1 0 11.55 11.55 0.6 0.6 0 0 0-0.75-0.8z" />
              <circle className="theme-btn__star theme-btn__star--a" cx="17.3" cy="6.2" r="0.7" />
              <circle className="theme-btn__star theme-btn__star--b" cx="20.4" cy="9.6" r="0.5" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
