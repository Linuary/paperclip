import type { Resource } from "i18next";

import { assertValidLocaleMessages } from "./locale-validation";

export const DEFAULT_LOCALE = "en" as const;

// Eagerly import only the locales that are in SUPPORTED_LANGUAGES.
// All other locale files are loaded lazily to keep the initial bundle lean.
// When a new locale is added to SUPPORTED_LANGUAGES in languages.ts, add
// its eager import below and the corresponding JSON file will be bundled.
import enMessages from "./locales/en.json";
import zhCNMessages from "./locales/zh-CN.json";

const eagerLocaleMessages: Record<string, unknown> = {
  en: enMessages,
  "zh-CN": zhCNMessages,
};

// Lazy imports for all other locale files — only loaded when i18next
// actually switches to that language (currently never, since only en
// and zh-CN appear in the language picker).
const lazyLocaleModules = import.meta.glob("./locales/*.json", {
  eager: false,
  import: "default",
}) as Record<string, () => Promise<unknown>>;

// Seed the localeMessages map with eagerly loaded locales. Lazily-loaded
// locales are added on demand via loadLocale() and cached here.
export const localeMessages: Record<string, unknown> = { ...eagerLocaleMessages };

for (const [locale, messages] of Object.entries(eagerLocaleMessages)) {
  try {
    assertValidLocaleMessages(messages);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Invalid ${locale} locale messages: ${message}`);
  }
}

/**
 * Load a locale that is not eagerly bundled. Returns the messages object
 * and caches it in localeMessages so future lookups resolve instantly.
 */
export async function loadLocale(locale: string): Promise<unknown> {
  if (locale in localeMessages) return localeMessages[locale];

  const loader = lazyLocaleModules[`./locales/${locale}.json`];
  if (!loader) throw new Error(`No locale file found for ${locale}`);

  const messages = await loader();
  localeMessages[locale] = messages;
  return messages;
}

export const supportedLocales = Object.keys(eagerLocaleMessages);

export const i18nextResources: Resource = Object.fromEntries(
  Object.entries(eagerLocaleMessages).map(([locale, messages]) => [
    locale,
    { translation: messages },
  ]),
) as Resource;

export type SupportedLocale = keyof typeof eagerLocaleMessages;
