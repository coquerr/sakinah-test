import { Coordinates, PrayerTimes } from "adhan"
import { PrayerTimeEntry } from "@/types/prayer"
import { getDagestanCalculationParams } from "@/lib/constants/dagestan-prayer-config"
import { prayerLabels } from "@/lib/constants/prayer-labels"

export function buildPrayerTimes(
  latitude: number,
  longitude: number,
  date: Date
): PrayerTimeEntry[] {
  const coordinates = new Coordinates(latitude, longitude)
  const params = getDagestanCalculationParams()
  const times = new PrayerTimes(coordinates, date, params)

  return [
    { name: "fajr", label: prayerLabels.fajr, time: times.fajr },
    { name: "sunrise", label: prayerLabels.sunrise, time: times.sunrise },
    { name: "dhuhr", label: prayerLabels.dhuhr, time: times.dhuhr },
    { name: "asr", label: prayerLabels.asr, time: times.asr },
    { name: "maghrib", label: prayerLabels.maghrib, time: times.maghrib },
    { name: "isha", label: prayerLabels.isha, time: times.isha }
  ]
}

export function getNextPrayer(entries: PrayerTimeEntry[], now: Date): PrayerTimeEntry {
  const upcoming = entries.find((entry) => entry.time.getTime() > now.getTime())
  return upcoming ?? entries[0]
}

export function getCurrentPrayerIndex(entries: PrayerTimeEntry[], now: Date): number {
  let index = -1
  entries.forEach((entry, i) => {
    if (entry.time.getTime() <= now.getTime()) {
      index = i
    }
  })
  return index
}

export function formatCountdown(target: Date, now: Date, locale: string = "ru-RU"): string {
  const diffMs = Math.max(0, target.getTime() - now.getTime())
  const totalSeconds = Math.floor(diffMs / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  const formatUnit = (value: number, unit: "hour" | "minute" | "second") =>
    new Intl.NumberFormat(locale, { style: "unit", unit, unitDisplay: "short" }).format(value)

  if (hours > 0) {
    return minutes > 0
      ? `${formatUnit(hours, "hour")} ${formatUnit(minutes, "minute")}`
      : formatUnit(hours, "hour")
  }

  if (minutes > 0) {
    return `${formatUnit(minutes, "minute")} ${formatUnit(seconds, "second")}`
  }

  return formatUnit(seconds, "second")
}

export function formatTime(date: Date, locale: string = "ru-RU"): string {
  return date.toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" })
}

export function getProgressToNext(entries: PrayerTimeEntry[], now: Date): number {
  const currentIndex = getCurrentPrayerIndex(entries, now)
  const nextEntry = getNextPrayer(entries, now)

  const currentTime =
    currentIndex >= 0
      ? entries[currentIndex].time.getTime()
      : entries[0].time.getTime() - 6 * 60 * 60 * 1000
  const nextTime = nextEntry.time.getTime()
  const total = nextTime - currentTime
  const elapsed = now.getTime() - currentTime

  if (total <= 0) return 0

  return Math.min(1, Math.max(0, elapsed / total))
}