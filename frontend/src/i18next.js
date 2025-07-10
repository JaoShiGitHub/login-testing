import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18next.use(initReactI18next).init({
  debug: true,
  fallbackLang: "en",
  resources: {
    en: {
      translation: {
        welcome: "Welcomeeee",
      },
    },
    esp: {
      translation: {
        welcome: "Bienvenido",
      },
    },
  },
});
