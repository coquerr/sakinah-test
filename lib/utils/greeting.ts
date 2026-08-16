import { TranslationKey } from "@/lib/i18n"

export function getGreeting(date: Date): TranslationKey {
  const hour = date.getHours()

  if (hour >= 4 && hour < 11) return "greeting.morning"
  if (hour >= 11 && hour < 17) return "greeting.afternoon"
  if (hour >= 17 && hour < 22) return "greeting.evening"
  return "greeting.night"
}