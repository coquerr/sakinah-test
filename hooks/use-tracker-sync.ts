"use client"

import { useEffect, useRef } from "react"
import { createClient } from "@/lib/supabase/client"
import { useSupabaseUser } from "@/hooks/use-supabase-user"
import { useTrackerStore } from "@/store/tracker-store"
import { TrackerRow } from "@/lib/supabase/types"
import { DayTracker } from "@/types/tracker"

export function useTrackerSync() {
  const { user } = useSupabaseUser()
  const hasPulledRef = useRef(false)
  const isPushingRef = useRef(false)

  const dirtyDates = useTrackerStore((state) => state.dirtyDates)

  useEffect(() => {
    if (!user || hasPulledRef.current) return

    hasPulledRef.current = true

    const pull = async () => {
      const supabase = createClient()
      const { data } = await supabase
        .from("prayer_tracker")
        .select("*")
        .eq("user_id", user.id)
        .returns<TrackerRow[]>()

      if (!data || data.length === 0) return

      isPushingRef.current = true

      const currentDays = useTrackerStore.getState().days
      const mergedDays: Record<string, DayTracker> = { ...currentDays }

      data.forEach((row) => {
        if (!mergedDays[row.date]) {
          mergedDays[row.date] = row.statuses as DayTracker
        }
      })

      useTrackerStore.setState({ days: mergedDays })

      setTimeout(() => {
        isPushingRef.current = false
      }, 0)
    }

    pull()
  }, [user])

  useEffect(() => {
    if (!user || isPushingRef.current) return
    if (dirtyDates.length === 0) return

    const timeout = setTimeout(async () => {
      const state = useTrackerStore.getState()
      const datesToPush = state.dirtyDates

      if (datesToPush.length === 0) return

      const supabase = createClient()
      const rows: TrackerRow[] = datesToPush
        .filter((date) => state.days[date])
        .map((date) => ({
          user_id: user.id,
          date,
          statuses: state.days[date],
          updated_at: new Date().toISOString()
        }))

      if (rows.length === 0) {
        useTrackerStore.getState().clearDirtyDates(datesToPush)
        return
      }

      const { error } = await supabase.from("prayer_tracker").upsert(rows)

      if (!error) {
        useTrackerStore.getState().clearDirtyDates(datesToPush)
      }
    }, 800)

    return () => clearTimeout(timeout)
  }, [user, dirtyDates])
}