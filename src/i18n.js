import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translation files
import enTranslation from "./locales/en.json";
import arTranslation from "./locales/ar.json";

const resources = {
  en: { translation: enTranslation },
  ar: { translation: arTranslation },
};

i18n
  .use(LanguageDetector) // Detect user's language
  .use(initReactI18next) // Connect with React
  .init({
    resources, // Load translations from JSON files
    lng: localStorage.getItem("lang") || "en", // Set initial language from localStorage
    fallbackLng: "en", // Default language
    debug: true, // Enable logs in development mode
    detection: {
      order: ["localStorage", "navigator"], // Detect from localStorage or browser
      caches: ["localStorage"], // Save selection in localStorage
    },
    interpolation: {
      escapeValue: false, // React already protects against XSS
    },
  });

export default i18n;
