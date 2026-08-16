import { TranslationKey } from "@/lib/i18n"

interface SignificantDate {
  month: number
  day: number
  labelKey: TranslationKey
}

export const significantHijriDates: SignificantDate[] = [
  { month: 1, day: 10, labelKey: "calendar.dates.ashura" },
  { month: 3, day: 12, labelKey: "calendar.dates.mawlid" },
  { month: 7, day: 27, labelKey: "calendar.dates.isra" },
  { month: 8, day: 15, labelKey: "calendar.dates.baraat" },
  { month: 9, day: 1, labelKey: "calendar.dates.ramadanStart" },
  { month: 9, day: 27, labelKey: "calendar.dates.laylatAlQadr" },
  { month: 10, day: 1, labelKey: "calendar.dates.eidFitr" },
  { month: 12, day: 9, labelKey: "calendar.dates.dayOfArafah" },
  { month: 12, day: 10, labelKey: "calendar.dates.eidAdha" }
]

export function findSignificantDate(month: number, day: number): TranslationKey | null {
  const found = significantHijriDates.find((item) => item.month === month && item.day === day)
  return found?.labelKey ?? null
}