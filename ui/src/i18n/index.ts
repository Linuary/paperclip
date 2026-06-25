import i18n, { type InitOptions, type TFunction, type TOptions } from "i18next";
import { initReactI18next, useTranslation as useReactI18nextTranslation } from "react-i18next";

import { DEFAULT_LOCALE, i18nextResources, supportedLocales } from "./locales";
import { LOCALE_STORAGE_KEY, DEFAULT_LANGUAGE } from "./languages";

function readInitialLocale(): string {
  try {
    const saved = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (saved && supportedLocales.includes(saved)) return saved;
  } catch {
    // localStorage unavailable
  }
  return DEFAULT_LANGUAGE;
}

const i18nextOptions: InitOptions = {
  resources: i18nextResources,
  lng: readInitialLocale(),
  fallbackLng: DEFAULT_LOCALE,
  supportedLngs: supportedLocales,
  defaultNS: "translation",
  interpolation: { escapeValue: false },
  returnObjects: false,
  initAsync: false,
};

// Initialize i18next synchronously. initReactI18next must be registered
// before init() so the React binding picks up language-change events.
i18n.use(initReactI18next);
void i18n.init(i18nextOptions).catch((error: unknown) => {
  console.error("Failed to initialize i18next", error);
});

export function t(key: string, options: TOptions = {}) {
  return i18n.t(key, options);
}

export const useTranslation = useReactI18nextTranslation;
export type { TFunction };
export { i18n };
