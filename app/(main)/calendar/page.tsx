"use client"

import { useMemo, useState } from "react"
import { HijriHeader } from "@/components/calendar/hijri-header"
import { MonthGrid } from "@/components/calendar/month-grid"
import { SignificantDatesList } from "@/components/calendar/significant-dates-list"
import { getMonthDays, shiftHijriMonth, toHijri } from "@/lib/utils/hijri"
import { useTranslation } from "@/hooks/use-translation"
import { hijriMonthsByLanguage } from "@/lib/i18n/hijri-months"

export default function CalendarPage() {
  const [referenceDate, setReferenceDate] = useState(new Date())
  const { language } = useTranslation()

  const days = useMemo(() => getMonthDays(referenceDate), [referenceDate])
  const referenceHijri = useMemo(() => toHijri(referenceDate), [referenceDate])
  const todayHijri = useMemo(() => toHijri(new Date()), [])

  const localizedDays = useMemo(
    () =>
      days.map((day) => ({
        ...day,
        hijri: {
          ...day.hijri,
          monthName: hijriMonthsByLanguage[language][day.hijri.month - 1]
        }
      })),
    [days, language]
  )

  const localizedToday = {
    ...todayHijri,
    monthName: hijriMonthsByLanguage[language][todayHijri.month - 1]
  }

  const monthLabel = `${hijriMonthsByLanguage[language][referenceHijri.month - 1]} ${referenceHijri.year}`

  return (
    <section className="py-4">
      <HijriHeader hijri={localizedToday} />
      <MonthGrid
        days={localizedDays}
        monthLabel={monthLabel}
        onPrev={() => setReferenceDate((prev) => shiftHijriMonth(prev, -1))}
        onNext={() => setReferenceDate((prev) => shiftHijriMonth(prev, 1))}
      />
      <SignificantDatesList days={localizedDays} />
    </section>
  )
}