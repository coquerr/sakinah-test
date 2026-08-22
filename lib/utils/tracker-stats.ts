import { DayTracker } from "@/types/tracker"
import { trackedPrayerNames } from "@/lib/constants/tracked-prayers"
import { PrayerName } from "@/types/prayer"

function getDateKey(date: Date): string {
  return date.toISOString().split("T")[0]
}

function isDayComplete(day: DayTracker | undefined): boolean {
  if (!day) return false
  return trackedPrayerNames.every((name) => day[name] === "done")
}

export function getCurrentStreak(days: Record<string, DayTracker>): number {
  let streak = 0
  let isFirstDay = true
  const cursor = new Date()

  for (let i = 0; i < 3650; i++) {
    const key = getDateKey(cursor)
    const complete = isDayComplete(days[key])

    if (complete) {
      streak++
    } else if (!isFirstDay) {
      break
    }

    isFirstDay = false
    cursor.setDate(cursor.getDate() - 1)
  }

  return streak
}

export interface RangeStats {
  donePercentage: number
  doneCount: number
  missedCount: number
  notMarkedCount: number
  totalPossible: number
}

export function getRangeStats(days: Record<string, DayTracker>, rangeDays: number): RangeStats {
  let doneCount = 0
  let missedCount = 0
  const cursor = new Date()

  for (let i = 0; i < rangeDays; i++) {
    const key = getDateKey(cursor)
    const day = days[key] ?? {}

    trackedPrayerNames.forEach((name) => {
      if (day[name] === "done") doneCount++
      if (day[name] === "missed") missedCount++
    })

    cursor.setDate(cursor.getDate() - 1)
  }

  const totalPossible = rangeDays * trackedPrayerNames.length
  const notMarkedCount = totalPossible - doneCount - missedCount
  const donePercentage = totalPossible > 0 ? Math.round((doneCount / totalPossible) * 100) : 0

  return { donePercentage, doneCount, missedCount, notMarkedCount, totalPossible }
}

export interface DayBreakdown {
  dateKey: string
  doneCount: number
  missedCount: number
  notMarkedCount: number
  total: number
}

export function getDailyBreakdown(days: Record<string, DayTracker>, rangeDays: number): DayBreakdown[] {
  const result: DayBreakdown[] = []
  const cursor = new Date()

  for (let i = 0; i < rangeDays; i++) {
    const key = getDateKey(cursor)
    const day = days[key] ?? {}
    const doneCount = trackedPrayerNames.filter((name) => day[name] === "done").length
    const missedCount = trackedPrayerNames.filter((name) => day[name] === "missed").length
    const notMarkedCount = trackedPrayerNames.length - doneCount - missedCount

    result.unshift({
      dateKey: key,
      doneCount,
      missedCount,
      notMarkedCount,
      total: trackedPrayerNames.length
    })
    cursor.setDate(cursor.getDate() - 1)
  }

  return result
}

export interface PrayerBreakdown {
  name: PrayerName
  doneCount: number
  missedCount: number
  notMarkedCount: number
  total: number
  donePercentage: number
}

export function getPrayerBreakdown(days: Record<string, DayTracker>, rangeDays: number): PrayerBreakdown[] {
  const counters = trackedPrayerNames.map((name) => ({ name, doneCount: 0, missedCount: 0 }))
  const cursor = new Date()

  for (let i = 0; i < rangeDays; i++) {
    const key = getDateKey(cursor)
    const day = days[key] ?? {}

    counters.forEach((counter) => {
      if (day[counter.name] === "done") counter.doneCount++
      if (day[counter.name] === "missed") counter.missedCount++
    })

    cursor.setDate(cursor.getDate() - 1)
  }

  return counters.map((counter) => ({
    name: counter.name,
    doneCount: counter.doneCount,
    missedCount: counter.missedCount,
    notMarkedCount: rangeDays - counter.doneCount - counter.missedCount,
    total: rangeDays,
    donePercentage: rangeDays > 0 ? Math.round((counter.doneCount / rangeDays) * 100) : 0
  }))
  
}
export interface BestDayResult {
  dateKey: string
  doneCount: number
  total: number
}

export function getBestDay(days: Record<string, DayTracker>, rangeDays: number): BestDayResult | null {
  const breakdown = getDailyBreakdown(days, rangeDays)
  let best: BestDayResult | null = null

  breakdown.forEach((day) => {
    if (day.doneCount === 0) return
    if (!best || day.doneCount > best.doneCount) {
      best = { dateKey: day.dateKey, doneCount: day.doneCount, total: day.total }
    }
  })

  return best
}
export interface MonthDayCell {
  dateKey: string
  dayOfMonth: number
  doneCount: number
  missedCount: number
  total: number
  isFuture: boolean
  isToday: boolean
}

export function getMonthHeatmap(
  days: Record<string, DayTracker>,
  year: number,
  month: number
): MonthDayCell[] {
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const todayKey = getDateKey(new Date())
  const result: MonthDayCell[] = []

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day)
    const key = getDateKey(date)
    const dayTracker = days[key] ?? {}
    const doneCount = trackedPrayerNames.filter((name) => dayTracker[name] === "done").length
    const missedCount = trackedPrayerNames.filter((name) => dayTracker[name] === "missed").length

    result.push({
      dateKey: key,
      dayOfMonth: day,
      doneCount,
      missedCount,
      total: trackedPrayerNames.length,
      isFuture: key > todayKey,
      isToday: key === todayKey
    })
  }

  return result
}