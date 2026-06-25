import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { i18n } from "@/i18n";
import {
  DEFAULT_LANGUAGE,
  LOCALE_STORAGE_KEY,
  SUPPORTED_LANGUAGES,
  type LanguageOption,
} from "@/i18n/languages";

interface LanguageContextValue {
  /** Currently active locale code */
  currentLocale: string;
  /** The resolved language option (falls back to DEFAULT_LANGUAGE) */
  currentLanguage: LanguageOption;
  /** All languages available for selection */
  supportedLanguages: LanguageOption[];
  /** Switch the UI language — persists to localStorage and updates i18next */
  changeLanguage: (locale: string) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

// --- helpers -----------------------------------------------------------------

function readPersistedLocale(): string | null {
  try {
    return localStorage.getItem(LOCALE_STORAGE_KEY);
  } catch {
    return null;
  }
}

function persistLocale(locale: string): void {
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // storage unavailable — silent fail
  }
}

/** Try to match the browser language to a supported locale */
function detectBrowserLocale(): string | null {
  const nav = navigator.languages?.[0] ?? navigator.language;
  if (!nav) return null;

  // Exact match (e.g. "zh-CN")
  if (SUPPORTED_LANGUAGES.some((l) => l.code === nav)) return nav;

  // Prefix match (e.g. "zh" → "zh-CN")
  const prefix = nav.split("-")[0];
  const match = SUPPORTED_LANGUAGES.find((l) => l.code.startsWith(prefix));
  return match?.code ?? null;
}

function resolveInitialLocale(): string {
  const persisted = readPersistedLocale();
  if (persisted && SUPPORTED_LANGUAGES.some((l) => l.code === persisted)) {
    return persisted;
  }
  return detectBrowserLocale() ?? DEFAULT_LANGUAGE;
}

function findLanguageOption(code: string): LanguageOption {
  return SUPPORTED_LANGUAGES.find((l) => l.code === code) ?? SUPPORTED_LANGUAGES.find((l) => l.code === DEFAULT_LANGUAGE)!;
}

// --- provider ----------------------------------------------------------------

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLocale, setCurrentLocale] = useState<string>(resolveInitialLocale);

  const changeLanguage = useCallback((locale: string) => {
    if (!SUPPORTED_LANGUAGES.some((l) => l.code === locale)) return;
    persistLocale(locale);
    // Update i18next — emits 'languageChanged' event which react-i18next listens to
    void i18n.changeLanguage(locale);
    setCurrentLocale(locale);
  }, []);

  const value: LanguageContextValue = {
    currentLocale,
    currentLanguage: findLanguageOption(currentLocale),
    supportedLanguages: SUPPORTED_LANGUAGES,
    changeLanguage,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
