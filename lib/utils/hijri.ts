import { HijriDate, CalendarDay } from "@/types/calendar"
import { hijriMonthNames } from "@/lib/constants/hijri-months"
import { findSignificantDate } from "@/lib/constants/significant-dates"

const formatter = new Intl.DateTimeFormat("en-US-u-ca-islamic-umalqura", {
  day: "numeric",
  month: "numeric",
  year: "numeric"
})

export function toHijri(date: Date): HijriDate {
  const parts = formatter.formatToParts(date)
  const day = Number(parts.find((part) => part.type === "day")?.value ?? 1)
  const month = Number(parts.find((part) => part.type === "month")?.value ?? 1)
  const year = Number(parts.find((part) => part.type === "year")?.value ?? 1445)

  return { day, month, year, monthName: hijriMonthNames[month - 1] }
}

export function getMonthDays(referenceDate: Date): CalendarDay[] {
  const hijriRef = toHijri(referenceDate)
  const today = new Date()
  const days: CalendarDay[] = []

  for (let offset = -20; offset <= 40; offset++) {
    const candidate = new Date(referenceDate)
    candidate.setDate(candidate.getDate() + offset)

    const hijri = toHijri(candidate)

    if (hijri.month === hijriRef.month && hijri.year === hijriRef.year) {
      days.push({
        gregorian: candidate,
        hijri,
        isToday: candidate.toDateString() === today.toDateString(),
        isSignificant: findSignificantDate(hijri.month, hijri.day) !== null,
        significantLabel: findSignificantDate(hijri.month, hijri.day)
      })
    }
  }

  return days.sort((a, b) => a.hijri.day - b.hijri.day)
}

export function shiftHijriMonth(referenceDate: Date, direction: 1 | -1): Date {
  const shifted = new Date(referenceDate)
  shifted.setDate(shifted.getDate() + direction * 29)
  return shifted
}