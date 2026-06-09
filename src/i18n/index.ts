import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import it from "../locales/it/common.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      it: { common: it },
    },
    ns: ["common"],
    defaultNS: "common",
    fallbackLng: "it",
    supportedLngs: ["it"],
    interpolation: { escapeValue: false },
    detection: {
      order: ["cookie", "navigator"],
      caches: ["cookie"],
      lookupCookie: "lang",
      cookieMinutes: 525600,
      cookieOptions: { path: "/", sameSite: "strict" },
    },
  });

i18n.on("languageChanged", (lng) => {
  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("lang", lng.slice(0, 2));
  }
});

if (typeof document !== "undefined" && i18n.language) {
  document.documentElement.setAttribute("lang", i18n.language.slice(0, 2));
}

export default i18n;
