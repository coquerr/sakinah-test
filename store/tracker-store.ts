"use client"

import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { PrayerName } from "@/types/prayer"
import { DayTracker, TrackerStatus } from "@/types/tracker"
import { idbStorage } from "@/lib/idb-storage"

interface TrackerState {
  days: Record<string, DayTracker>
  dirtyDates: string[]
  toggleStatus: (dateKey: string, prayer: PrayerName, status: TrackerStatus) => void
  setStatus: (dateKey: string, prayer: PrayerName, status: TrackerStatus) => void
  getDay: (dateKey: string) => DayTracker
  clearDirtyDates: (dates: string[]) => void
}

export const useTrackerStore = create<TrackerState>()(
  persist(
    (set, get) => ({
      days: {},
      dirtyDates: [],
      toggleStatus: (dateKey, prayer, status) =>
        set((state) => {
          const currentDay = state.days[dateKey] ?? {}
          const nextStatus = currentDay[prayer] === status ? "pending" : status

          return {
            days: {
              ...state.days,
              [dateKey]: { ...currentDay, [prayer]: nextStatus }
            },
            dirtyDates: state.dirtyDates.includes(dateKey)
              ? state.dirtyDates
              : [...state.dirtyDates, dateKey]
          }
        }),
      setStatus: (dateKey, prayer, status) =>
        set((state) => {
          const currentDay = state.days[dateKey] ?? {}

          return {
            days: {
              ...state.days,
              [dateKey]: { ...currentDay, [prayer]: status }
            },
            dirtyDates: state.dirtyDates.includes(dateKey)
              ? state.dirtyDates
              : [...state.dirtyDates, dateKey]
          }
        }),
      getDay: (dateKey) => get().days[dateKey] ?? {},
      clearDirtyDates: (dates) =>
        set((state) => ({
          dirtyDates: state.dirtyDates.filter((date) => !dates.includes(date))
        }))
    }),
    { 
      name: "sakinah-tracker", 
      skipHydration: true,
      storage: createJSONStorage(() => idbStorage)
    }
  )
)

export function getTodayKey(): string {
  return new Date().toISOString().split("T")[0]
}