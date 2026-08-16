import { TranslationKey } from "@/lib/i18n"

export interface HijriDate {
  day: number
  month: number
  monthName: string
  year: number
}

export interface CalendarDay {
  gregorian: Date
  hijri: HijriDate
  isToday: boolean
  isSignificant: boolean
  significantLabel: TranslationKey | null
}