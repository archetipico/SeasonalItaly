import { useCallback, useEffect, useRef, useState } from "react";
import { copy } from "@/copy";
import { DisclaimerText } from "@/components/DisclaimerText";

/** Storage key of the visitor's consent. */
const KEY = "seasonalitaly-disclaimer";

/**
 * Read the stored consent.
 * @returns True when the visitor already accepted, false also when storage is blocked.
 */
function hasAccepted(): boolean {
  try {
    return localStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

/**
 * Block the page until the visitor has scrolled through the disclaimer and accepted it.
 * @returns Modal dialog, or nothing once accepted.
 */
export function DisclaimerGate() {
  const [isAccepted, setIsAccepted] = useState<boolean>(() => hasAccepted());
  const [isAtBottom, setIsAtBottom] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const acceptRef = useRef<HTMLButtonElement>(null);

  const check = useCallback(() => {
    const body = bodyRef.current!;
    const doesFit = body.scrollHeight <= body.clientHeight + 4;
    const hasReachedEnd = body.scrollTop + body.clientHeight >= body.scrollHeight - 8;
    if (doesFit || hasReachedEnd) setIsAtBottom(true);
  }, []);

  useEffect(() => {
    if (isAccepted) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    bodyRef.current?.focus();
    check();

    const onResize = () => check();
    window.addEventListener("resize", onResize);

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const focusables = panelRef.current!.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]):not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])'
      );
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("resize", onResize);
      document.removeEventListener("keydown", onKey);
    };
  }, [isAccepted, check]);

  useEffect(() => {
    if (!isAccepted && isAtBottom) acceptRef.current?.focus();
  }, [isAccepted, isAtBottom]);

  if (isAccepted) return null;

  /** Remember the consent where storage allows it, and open the page. */
  const accept = () => {
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      // storage unavailable (private mode, blocked): let the user through this session anyway
    }
    setIsAccepted(true);
  };

  /** Scroll the text by nearly one box height, honouring a reduced-motion preference. */
  const scrollMore = () => {
    const body = bodyRef.current!;
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    body.scrollBy({ top: Math.round(body.clientHeight * 0.85), behavior: isReduced ? "auto" : "smooth" });
  };

  return (
    <div className="gate" role="dialog" aria-modal="true" aria-labelledby="gate-title">
      <div className="gate__panel" ref={panelRef}>
        <div className="gate__head">
          <h2 id="gate-title" className="gate__title">
            <span className="fleuron" aria-hidden>❦</span> {copy.gate.title}
          </h2>
          <p className="gate__lead">{copy.gate.lead}</p>
        </div>

        <div className="gate__scroll">
          <div className="gate__body" ref={bodyRef} tabIndex={0} onScroll={check}>
            <DisclaimerText />
          </div>
          <div className="gate__fade" data-show={!isAtBottom} aria-hidden />
          <button
            type="button"
            className="gate__hint"
            data-show={!isAtBottom}
            onClick={scrollMore}
            tabIndex={-1}
            aria-hidden
          >
            {copy.gate.scroll} <span aria-hidden>↓</span>
          </button>
        </div>

        <div className="gate__foot">
          <button
            ref={acceptRef}
            type="button"
            className="gate__accept"
            onClick={accept}
            disabled={!isAtBottom}
          >
            {isAtBottom ? copy.gate.accept : copy.gate.scrollCta}
          </button>
        </div>
      </div>
    </div>
  );
}
