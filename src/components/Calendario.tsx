import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { fruits, vegetables, isInSeason, type Item } from "@/data/seasonal";
import { Row } from "@/components/Row";
import { useMonths } from "@/lib/useMonths";
import { cn } from "@/lib/utils";

type Mode = "tutti" | "frutta" | "verdura" | "ora" | "italia";

function CalendarCard({
  title,
  items,
  kind,
  currentMonth,
  query,
}: {
  title: string;
  items: Item[];
  kind: "frutta" | "verdura";
  currentMonth: number;
  query: string;
}) {
  const { t } = useTranslation();
  const { short } = useMonths();
  const matches = (it: Item) => !query.trim() || it.name.includes(query.trim().toLowerCase());
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hintVisible, setHintVisible] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const update = () => {
      const overflow = el.scrollWidth > el.clientWidth + 1;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      setHintVisible(overflow && !atEnd);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [items.length]);

  return (
    <article className="card">
      <header className="card__head">
        <h3 className="card__title">{title}</h3>
        <span className="card__count">{t("calendar.count", { n: items.length })}</span>
      </header>

      <div className="card__scroll-wrap">
        <div className="table-scroll" ref={scrollRef}>
          <div className="table-inner">
          <div className="months">
            <div />
            {short.map((m, i) => (
              <div
                key={m}
                className={cn("months__cell", currentMonth === i + 1 && "is-now")}
              >
                {m}
              </div>
            ))}
          </div>
            {items.length === 0 ? (
              <p className="px-6 py-10 text-ink/60">
                {t("calendar.noResult", { q: query })}
              </p>
            ) : (
              items.map((it, idx) => (
                <Row
                  key={it.name}
                  item={it}
                  kind={kind}
                  currentMonth={currentMonth}
                  index={idx}
                  dim={!matches(it)}
                />
              ))
            )}
          </div>
        </div>
        {hintVisible && (
          <div className="scroll-hint" aria-hidden>
            <span>scorri</span>
            <span className="scroll-hint__arrow">→</span>
          </div>
        )}
      </div>
    </article>
  );
}

export function Calendario() {
  const { t } = useTranslation();
  const currentMonth = new Date().getMonth() + 1;
  const [mode, setMode] = useState<Mode>("tutti");
  const [query, setQuery] = useState("");

  const modes: { id: Mode; label: string; hint: string }[] = [
    { id: "tutti", label: t("modes.all"), hint: t("modes.allHint") },
    { id: "frutta", label: t("modes.fruit"), hint: "" },
    { id: "verdura", label: t("modes.veg"), hint: "" },
    { id: "ora", label: t("modes.now"), hint: t("modes.nowHint") },
    { id: "italia", label: t("modes.italy"), hint: t("modes.italyHint") },
  ];

  const passKind = (kind: "frutta" | "verdura") =>
    mode === "tutti" || mode === "ora" || mode === "italia" || mode === kind;

  const filterByMode = (it: Item) => {
    if (mode === "ora" && isInSeason(it, currentMonth) === "off") return false;
    if (mode === "italia" && it.imported) return false;
    return true;
  };

  const filterByQuery = (it: Item) =>
    !query.trim() || it.name.includes(query.trim().toLowerCase());

  const visibleFruits = useMemo(
    () => fruits.filter(filterByMode).filter(filterByQuery),
    [mode, query, currentMonth]
  );
  const visibleVeg = useMemo(
    () => vegetables.filter(filterByMode).filter(filterByQuery),
    [mode, query, currentMonth]
  );

  return (
    <section className="container py-14 lg:py-20">
      <div className="glyph-rule mb-14" aria-hidden>
        <span className="glyph-rule__mark">❦</span>
      </div>
      <div className="max-w-[60ch]">
        <p className="label mb-3">{t("calendar.label")}</p>
        <h3
          className="display text-ink"
          style={{ fontSize: "clamp(2.2rem, 4.6vw, 3.6rem)" }}
        >
          {t("calendar.titleLead")}
          <br />
          <span className="serif-italic" style={{ color: "hsl(var(--basil))" }}>
            {t("calendar.titleTail")}
          </span>
        </h3>
        <p className="mt-6 text-[16px] leading-relaxed text-ink/70 text-pretty">
          {t("calendar.body")}
        </p>
      </div>

      <div className="legend mt-10">
        <div className="legend__item">
          <span className="legend__symbol mark mark--peak-fruit" />
          <div>
            <p className="legend__title">{t("legend.peakTitle")}</p>
            <p className="legend__text">{t("legend.peakBody")}</p>
          </div>
        </div>
        <div className="legend__item">
          <span className="legend__symbol mark mark--shoulder-fruit" />
          <div>
            <p className="legend__title">{t("legend.shoulderTitle")}</p>
            <p className="legend__text">{t("legend.shoulderBody")}</p>
          </div>
        </div>
        <div className="legend__item">
          <span className="legend__symbol mark mark--import" />
          <div>
            <p className="legend__title">{t("legend.importTitle")}</p>
            <p className="legend__text">{t("legend.importBody")}</p>
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-end gap-x-6 gap-y-4">
        <div className="flex flex-wrap gap-2">
          {modes.map((m) => (
            <button
              key={m.id}
              type="button"
              className="chip"
              data-on={mode === m.id}
              onClick={() => setMode(m.id)}
              title={m.hint || undefined}
            >
              {m.label}
            </button>
          ))}
        </div>
        <div className="flex-1 min-w-[220px] max-w-md">
          <label className="label block mb-2" htmlFor="q">
            {t("calendar.search")}
          </label>
          <input
            id="q"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("calendar.searchPlaceholder")}
            className="search"
          />
        </div>
      </div>

      <div className="grid xl:grid-cols-2 gap-8 lg:gap-10 items-start mt-10">
        {passKind("frutta") && (
          <CalendarCard
            title={t("calendar.fruit")}
            items={visibleFruits}
            kind="frutta"
            currentMonth={currentMonth}
            query={query}
          />
        )}
        {passKind("verdura") && (
          <CalendarCard
            title={t("calendar.veg")}
            items={visibleVeg}
            kind="verdura"
            currentMonth={currentMonth}
            query={query}
          />
        )}
      </div>
    </section>
  );
}
