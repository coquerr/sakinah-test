import { PrayerName } from "@/types/prayer"

export type TrackerStatus = "done" | "missed" | "pending"

export type DayTracker = Partial<Record<PrayerName, TrackerStatus>>