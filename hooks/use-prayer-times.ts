"use client"

import { useEffect, useState } from "react"
import { useGeolocation } from "@/hooks/use-geolocation"
import { buildPrayerTimes, getNextPrayer, getProgressToNext } from "@/lib/utils/prayer"
import { PrayerTimeEntry } from "@/types/prayer"

export function usePrayerTimes() {
  const { coordinates, status } = useGeolocation()
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const entries: PrayerTimeEntry[] = coordinates
    ? buildPrayerTimes(coordinates.latitude, coordinates.longitude, now)
    : []

  const nextPrayer = entries.length > 0 ? getNextPrayer(entries, now) : null
  const progress = entries.length > 0 ? getProgressToNext(entries, now) : 0

  return { entries, nextPrayer, progress, now, status, locationLabel: coordinates?.label ?? "" }
}