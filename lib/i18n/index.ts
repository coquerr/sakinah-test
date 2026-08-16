import { Language } from "@/types/settings"
import { Dictionary, TranslationKey } from "./types"
import { ru } from "./dictionaries/ru"
import { en } from "./dictionaries/en"
import { ar } from "./dictionaries/ar"

export const dictionaries: Record<Language, Dictionary> = { ru, en, ar }

export const rtlLanguages: Language[] = ["ar"]

export const localeMap: Record<Language, string> = {
  ru: "ru-RU",
  en: "en-US",
  ar: "ar-SA"
}

export function getDirection(language: Language) {
  return rtlLanguages.includes(language) ? "rtl" : "ltr"
}

export function resolveTranslation(dictionary: Dictionary, key: TranslationKey) {
  return key.split(".").reduce<unknown>((value, segment) => {
    if (value && typeof value === "object" && segment in value) {
      return (value as Record<string, unknown>)[segment]
    }
    return key
  }, dictionary) as string
}

export type { Dictionary, TranslationKey }