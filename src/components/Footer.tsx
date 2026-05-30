import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer id="disclaimer" className="disclaimer-footer">
      <div className="container py-14">
        <div className="disclaimer">
          <div className="disclaimer__eyebrow" aria-hidden>
            <span className="disclaimer__rule" />
            <span className="disclaimer__glyph serif-italic">❦</span>
            <span className="disclaimer__label serif-italic">
              {t("footer.eyebrow")}
            </span>
            <span className="disclaimer__rule disclaimer__rule--long" />
          </div>
          <p className="disclaimer__lead serif-italic">{t("footer.lead")}</p>
          <p className="disclaimer__body text-pretty">{t("footer.body")}</p>
        </div>
      </div>
    </footer>
  );
}
