"use client"

import { useEffect, useMemo, useState } from "react"
import { HijriHeader } from "@/components/calendar/hijri-header"
import { MonthGrid } from "@/components/calendar/month-grid"
import { SelectedDayCard } from "@/components/calendar/selected-day-card"
import { SignificantDatesList } from "@/components/calendar/significant-dates-list"
import { getMonthDays, shiftHijriMonth, toHijri } from "@/lib/utils/hijri"
import { useTranslation } from "@/hooks/use-translation"
import { hijriMonthsByLanguage } from "@/lib/i18n/hijri-months"
import { CalendarDay } from "@/types/calendar"

export default function CalendarPage() {
  const [referenceDate, setReferenceDate] = useState(new Date())
  const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(null)
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

  useEffect(() => {
    const todayCell = localizedDays.find((day) => day.isToday)
    setSelectedDay(todayCell ?? null)
  }, [localizedDays])

  const localizedToday = {
    ...todayHijri,
    monthName: hijriMonthsByLanguage[language][todayHijri.month - 1]
  }

  const isCurrentMonthView =
    referenceHijri.month === todayHijri.month && referenceHijri.year === todayHijri.year

  const monthLabel = `${hijriMonthsByLanguage[language][referenceHijri.month - 1]} ${referenceHijri.year}`

  return (
    <section className="py-4">
      <HijriHeader hijri={localizedToday} gregorianDate={new Date()} />
      <MonthGrid
        days={localizedDays}
        monthLabel={monthLabel}
        isCurrentMonthView={isCurrentMonthView}
        selectedDateKey={selectedDay?.gregorian.toDateString() ?? null}
        onPrev={() => setReferenceDate((prev) => shiftHijriMonth(prev, -1))}
        onNext={() => setReferenceDate((prev) => shiftHijriMonth(prev, 1))}
        onToday={() => setReferenceDate(new Date())}
        onSelectDay={setSelectedDay}
      />
      <SelectedDayCard day={selectedDay} />
      <SignificantDatesList days={localizedDays} />
    </section>
  )
}