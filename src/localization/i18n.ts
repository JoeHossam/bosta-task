import { initReactI18next } from "react-i18next";
import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { en, ar } from "./local.json";

// resources should be gotten from some server
i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    detection: {
      order: [
        "path",
        "querystring",
        "cookie",
        "localStorage",
        "sessionStorage",
        "navigator",
        "htmlTag",
        "subdomain",
      ],
    },
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },
    supportedLngs: ["ar", "en"],
  });

declare module "i18next" {
  interface CustomTypeOptions {
    resources: typeof en;
  }
}
