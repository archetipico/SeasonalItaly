import { useTranslation } from "react-i18next";

export function useMonths(): { long: string[]; short: string[] } {
  const { t } = useTranslation();
  return {
    long: t("months.long", { returnObjects: true }) as string[],
    short: t("months.short", { returnObjects: true }) as string[],
  };
}
