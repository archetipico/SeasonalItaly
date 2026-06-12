import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const KEY = "seasonalitaly-disclaimer";

function hasAccepted(): boolean {
  try {
    return localStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

export function DisclaimerGate() {
  const { t } = useTranslation();
  const [accepted, setAccepted] = useState<boolean>(() => hasAccepted());
  const [atBottom, setAtBottom] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const acceptRef = useRef<HTMLButtonElement>(null);

  const check = useCallback(() => {
    const el = bodyRef.current;
    if (!el) return;
    const scrollable = el.scrollHeight > el.clientHeight + 4;
    if (!scrollable) {
      setAtBottom(true);
      return;
    }
    setAtBottom(el.scrollTop + el.clientHeight >= el.scrollHeight - 8);
  }, []);

  useEffect(() => {
    if (accepted) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    bodyRef.current?.focus();
    check();

    const onResize = () => check();
    window.addEventListener("resize", onResize);

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;
      const focusables = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("resize", onResize);
      document.removeEventListener("keydown", onKey);
    };
  }, [accepted, check]);

  useEffect(() => {
    if (!accepted && atBottom) acceptRef.current?.focus();
  }, [accepted, atBottom]);

  if (accepted) return null;

  const accept = () => {
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      // storage unavailable (private mode, blocked): let the user through this session anyway
    }
    setAccepted(true);
  };

  const scrollMore = () => {
    const el = bodyRef.current;
    if (!el) return;
    el.scrollBy({ top: Math.round(el.clientHeight * 0.85), behavior: "smooth" });
  };

  return (
    <div className="gate" role="dialog" aria-modal="true" aria-labelledby="gate-title">
      <div className="gate__panel" ref={panelRef}>
        <span className="gate__glyph serif-italic" aria-hidden>❦</span>
        <h2 id="gate-title" className="gate__title">{t("gate.title")}</h2>
        <p className="gate__lead serif-italic">{t("gate.lead")}</p>

        <div className="gate__scroll">
          <div className="gate__body text-pretty" ref={bodyRef} tabIndex={0} onScroll={check}>
            {t("footer.body")}
          </div>
          <div className="gate__fade" data-show={!atBottom} aria-hidden />
          <button
            type="button"
            className="gate__hint"
            data-show={!atBottom}
            onClick={scrollMore}
            tabIndex={-1}
            aria-hidden
          >
            <span>{t("gate.scroll")}</span>
            <span className="gate__hint-arrow">↓</span>
          </button>
        </div>

        <button
          ref={acceptRef}
          type="button"
          className="gate__accept"
          onClick={accept}
          disabled={!atBottom}
        >
          {atBottom ? t("gate.accept") : t("gate.scrollCta")}
        </button>
      </div>
    </div>
  );
}
