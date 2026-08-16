"use client"

import { useMemo, useState } from "react"
import { useTrackerStore } from "@/store/tracker-store"
import { StreakCard } from "@/components/stats/streak-card"
import { RangeSummary } from "@/components/stats/range-summary"
import { WeekChart } from "@/components/stats/week-chart"
import { getCurrentStreak, getRangeStats, getDailyBreakdown } from "@/lib/utils/tracker-stats"
import { useTranslation } from "@/hooks/use-translation"
import { localeMap } from "@/lib/i18n"

export default function StatsPage() {
  const days = useTrackerStore((state) => state.days)
  const [range, setRange] = useState<"week" | "month">("week")
  const { language } = useTranslation()
  const locale = localeMap[language]

  const streak = useMemo(() => getCurrentStreak(days), [days])
  const rangeStats = useMemo(
    () => getRangeStats(days, range === "week" ? 7 : 30),
    [days, range]
  )
  const breakdown = useMemo(() => getDailyBreakdown(days, 7), [days])

  return (
    <section className="py-4">
      <StreakCard streak={streak} />
      <RangeSummary range={range} onRangeChange={setRange} stats={rangeStats} />
      <WeekChart data={breakdown} locale={locale} />
    </section>
  )
}