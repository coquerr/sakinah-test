import { DayTracker } from "@/types/tracker"
import { trackedPrayerNames } from "@/lib/constants/tracked-prayers"

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
  const donePercentage = totalPossible > 0 ? Math.round((doneCount / totalPossible) * 100) : 0

  return { donePercentage, doneCount, missedCount, totalPossible }
}

export interface DayBreakdown {
  dateKey: string
  doneCount: number
  total: number
}

export function getDailyBreakdown(days: Record<string, DayTracker>, rangeDays: number): DayBreakdown[] {
  const result: DayBreakdown[] = []
  const cursor = new Date()

  for (let i = 0; i < rangeDays; i++) {
    const key = getDateKey(cursor)
    const day = days[key] ?? {}
    const doneCount = trackedPrayerNames.filter((name) => day[name] === "done").length

    result.unshift({ dateKey: key, doneCount, total: trackedPrayerNames.length })
    cursor.setDate(cursor.getDate() - 1)
  }

  return result
}