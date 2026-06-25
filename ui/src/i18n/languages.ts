/**
 * Language registry — single source of truth for supported UI languages.
 *
 * Currently, only English and Simplified Chinese are shown in the language picker.
 * 38 additional locale files exist under ./locales/ and pass structural validation,
 * but their content is identical to English (0.1% translated). They are loaded
 * at import time so that `i18next` can resolve fallback chains, but they must
 * receive native-speaker review before being added to SUPPORTED_LANGUAGES.
 *
 * To add a new language:
 * 1. Translate the corresponding locale JSON file in ./locales/{code}.json
 * 2. Add an entry to SUPPORTED_LANGUAGES below
 * 3. Run `pnpm exec vitest run ui/src/i18n/locale-validation.test.ts` to verify
 */

export interface LanguageOption {
  /** i18n locale code — must match the filename in ./locales/ */
  code: string;
  /** Native name shown in the language picker */
  label: string;
  /** Optional emoji flag displayed next to the label */
  flag?: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "zh-CN", label: "简体中文", flag: "🇨🇳" },
];

/** Language used when no preference is stored and browser locale doesn't match */
export const DEFAULT_LANGUAGE = "zh-CN";

/** localStorage key for persisted language preference */
export const LOCALE_STORAGE_KEY = "paperclip.locale";
