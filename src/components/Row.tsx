import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { isInSeason, type Item } from "@/data/seasonal";
import { useMonths } from "@/lib/useMonths";

export function Row({
  item,
  kind,
  currentMonth,
  index,
  dim,
}: {
  item: Item;
  kind: "frutta" | "verdura";
  currentMonth: number;
  index: number;
  dim?: boolean;
}) {
  const { t } = useTranslation();
  const { long } = useMonths();

  return (
    <div
      className="row"
      data-dim={dim ? "true" : "false"}
      style={{ animationDelay: `${Math.min(index, 60) * 6}ms` }}
    >
      <div className="row__name">
        <span>{item.name}</span>
        {item.imported && <span className="row__tag">{t("row.import")}</span>}
      </div>

      {Array.from({ length: 12 }, (_, i) => {
        const m = i + 1;
        const status = isInSeason(item, m);
        const isNow = m === currentMonth;

        let markClass = "mark mark--off";
        if (status !== "off") {
          if (item.imported) {
            markClass = "mark mark--import";
          } else if (status === "peak") {
            markClass = cn("mark", kind === "frutta" ? "mark--peak-fruit" : "mark--peak-veg");
          } else {
            markClass = cn(
              "mark",
              kind === "frutta" ? "mark--shoulder-fruit" : "mark--shoulder-veg"
            );
          }
        }

        const stateLabel =
          status === "peak"
            ? t("row.peak")
            : status === "shoulder"
            ? t("row.shoulder")
            : t("row.off");
        const importLabel = item.imported && status !== "off" ? t("row.importedSuffix") : "";
        const label = `${item.name}, ${long[i]}: ${stateLabel}${importLabel}`;

        return (
          <div
            key={m}
            className={cn("row__cell", isNow && "is-now")}
            title={label}
            aria-label={label}
          >
            <span className={markClass} />
          </div>
        );
      })}
    </div>
  );
}
