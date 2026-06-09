import { useTranslation } from "react-i18next";
import { fruits, vegetables, isInSeason } from "@/data/seasonal";
import { useMonths } from "@/lib/useMonths";

export function Hero() {
  const { t } = useTranslation();
  const { long } = useMonths();

  const month = new Date().getMonth() + 1;
  const monthName = long[month - 1];

  const peakCount =
    fruits.filter((f) => isInSeason(f, month) === "peak" && !f.imported).length +
    vegetables.filter((v) => isInSeason(v, month) === "peak" && !v.imported).length;

  return (
    <section className="container pt-12 sm:pt-16 lg:pt-24 pb-12 lg:pb-20">
      <div className="animate-fade-up">
        <h2
          className="display text-balance text-ink"
          style={{ fontSize: "clamp(2.6rem, 6.6vw, 5.8rem)" }}
        >
          {t("hero.titleLead")}
          {" "}
          <span className="serif-italic" style={{ color: "hsl(var(--basil))" }}>
            {t("hero.titleTail")}
          </span>
        </h2>

        <a href="#disclaimer" className="hero-disclaimer-cta">
          <span aria-hidden className="hero-disclaimer-cta__glyph serif-italic">❦</span>
          <span className="hero-disclaimer-cta__text">
            {t("hero.disclaimerCta")}
          </span>
          <span aria-hidden className="hero-disclaimer-cta__arrow">↓</span>
        </a>

        <p className="mt-8 max-w-[58ch] text-[17px] sm:text-[18px] leading-relaxed text-ink/75 text-pretty">
          {t("hero.body")}
        </p>

        <div className="mt-8 flex flex-wrap items-baseline gap-x-8 gap-y-3">
          <div>
            <p className="label">{t("hero.thisMonth")}</p>
            <p className="mt-1 text-[22px] sm:text-[26px] font-medium text-ink capitalize">
              {monthName}
            </p>
          </div>
          <div>
            <p className="label">{t("hero.peakCount")}</p>
            <p className="mt-1 text-[22px] sm:text-[26px] font-medium text-ink tabular-nums">
              {peakCount} <span className="text-ink/55 text-base font-normal">{t("hero.items")}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
