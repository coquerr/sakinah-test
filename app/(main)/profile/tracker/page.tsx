"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ChevronLeft, BarChart2 } from "lucide-react"

import { PrayerTracker } from "@/components/prayer/prayer-tracker"
import { ProfileSummaryCard } from "@/components/profile/profile-summary-card"

import { useTrackerStore } from "@/store/tracker-store"
import { StreakCard } from "@/components/stats/streak-card"
import { RangeSummary } from "@/components/stats/range-summary"
import { WeekChart } from "@/components/stats/week-chart"
import { MonthHeatmapCard } from "@/components/stats/month-heatmap-card"
import { PrayerBreakdownList } from "@/components/stats/prayer-breakdown-list"
import { BestDayCards } from "@/components/stats/best-day-cards"

import {
  getCurrentStreak,
  getRangeStats,
  getDailyBreakdown,
  getPrayerBreakdown,
  getBestDay,
  getMonthHeatmap
} from "@/lib/utils/tracker-stats"
import { useTranslation } from "@/hooks/use-translation"
import { localeMap } from "@/lib/i18n"

export default function TrackerPage() {
  const days = useTrackerStore((state) => state.days)
  const [range, setRange] = useState<"week" | "month">("week")
  const { language } = useTranslation()
  const locale = localeMap[language]

  const rangeDays = range === "week" ? 7 : 30
  const now = useMemo(() => new Date(), [])

  const streak = useMemo(() => getCurrentStreak(days), [days])
  const rangeStats = useMemo(() => getRangeStats(days, rangeDays), [days, rangeDays])
  const breakdown = useMemo(() => getDailyBreakdown(days, 7), [days])
  const prayerBreakdown = useMemo(() => getPrayerBreakdown(days, rangeDays), [days, rangeDays])
  const bestDay = useMemo(() => getBestDay(days, rangeDays), [days, rangeDays])
  const monthCells = useMemo(
    () => getMonthHeatmap(days, now.getFullYear(), now.getMonth()),
    [days, now]
  )
  const averagePerDay = rangeDays > 0 ? rangeStats.doneCount / rangeDays : 0

  return (
    <section className="space-y-6 py-4">
      {/* Шапка */}
      <div className="mb-2 flex items-center gap-3">
        <Link 
          href="/profile" 
          className="flex h-10 w-10 items-center justify-center rounded-full bg-surface transition-colors hover:bg-surface-hover active:scale-95"
        >
          <ChevronLeft size={20} className="text-foreground" />
        </Link>
        <h1 className="font-heading text-xl font-semibold text-foreground">
          Трекер намазов
        </h1>
      </div>

      <ProfileSummaryCard />
      <PrayerTracker />

      {/* Блок статистики */}
      <div className="pt-4 space-y-4">
        <div className="mb-2 flex items-center gap-2">
          <BarChart2 size={18} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Статистика</h2>
        </div>
        
        <StreakCard streak={streak} summary={rangeStats} />
        <RangeSummary range={range} onRangeChange={setRange} stats={rangeStats} />
        <BestDayCards bestDay={bestDay} averagePerDay={averagePerDay} locale={locale} />
        
        {range === "week" ? (
          <WeekChart data={breakdown} locale={locale} />
        ) : (
          <MonthHeatmapCard cells={monthCells} locale={locale} />
        )}
        
        <PrayerBreakdownList data={prayerBreakdown} />
      </div>
    </section>
  )
}