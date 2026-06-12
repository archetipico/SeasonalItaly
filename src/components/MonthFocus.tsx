import { useTranslation } from "react-i18next";
import { fruits, vegetables, isInSeason, type Item } from "@/data/seasonal";
import { useMonths } from "@/lib/useMonths";
import { cn } from "@/lib/utils";

function FocusList({
  title,
  items,
  kind,
  emptyText,
}: {
  title: string;
  items: Item[];
  kind: "frutta" | "verdura";
  emptyText: string;
}) {
  if (items.length === 0) {
    return (
      <div>
        <h4 className="label mb-4">
          {title} <span className="text-ink/30">· 0</span>
        </h4>
        <p className="text-ink/60 text-[15px] leading-relaxed">{emptyText}</p>
      </div>
    );
  }
  return (
    <div>
      <h4 className="label mb-4">
        {title} <span className="text-ink/30">· {items.length}</span>
      </h4>
      <ul className="focus-list">
        {items.map((it) => (
          <li
            key={it.name}
            className={cn("focus-pill", kind === "frutta" ? "focus-pill--fruit" : "focus-pill--veg")}
          >
            <span className="focus-pill__dot" />
            <span>{it.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function MonthFocus() {
  const { t } = useTranslation();
  const { long } = useMonths();

  const month = new Date().getMonth() + 1;
  const monthName = long[month - 1];
  const peakFruit = fruits.filter((f) => isInSeason(f, month) === "peak" && !f.imported);
  const peakVeg = vegetables.filter((v) => isInSeason(v, month) === "peak" && !v.imported);
  const emptyText = t("focus.empty");

  return (
    <section className="container py-14 lg:py-20 border-t border-line/15">
      <div className="grid lg:grid-cols-[auto_1fr] gap-12 lg:gap-24 xl:gap-48 items-start">
        <div className="lg:sticky lg:top-24 lg:max-w-[22ch] lg:pr-4">
          <p className="label mb-3">{t("focus.label")}</p>
          <h3
            className="display text-ink capitalize"
            style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
          >
            {monthName}.
          </h3>
          <p className="mt-6 text-[16px] leading-relaxed text-ink/70 text-pretty">
            {t("focus.body")}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-10 lg:gap-14">
          <FocusList title={t("focus.fruit")} items={peakFruit} kind="frutta" emptyText={emptyText} />
          <FocusList title={t("focus.veg")} items={peakVeg} kind="verdura" emptyText={emptyText} />
        </div>
      </div>
    </section>
  );
}
