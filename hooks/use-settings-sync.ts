"use client"

import { useEffect, useRef } from "react"
import { createClient } from "@/lib/supabase/client"
import { useSupabaseUser } from "@/hooks/use-supabase-user"
import { useSettingsStore } from "@/store/settings-store"
import { SettingsRow } from "@/lib/supabase/types"

export function useSettingsSync() {
  const { user } = useSupabaseUser()
  const hasPulledRef = useRef(false)
  const isPushingRef = useRef(false)

  const coordinates = useSettingsStore((state) => state.coordinates)
  const language = useSettingsStore((state) => state.language)

  useEffect(() => {
    if (!user || hasPulledRef.current) return

    hasPulledRef.current = true

    const pull = async () => {
      const supabase = createClient()
      const { data } = await supabase
        .from("settings")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle<SettingsRow>()

      if (!data) return

      isPushingRef.current = true

      useSettingsStore.setState({
        language: data.language as any,
        coordinates:
          data.latitude !== null && data.longitude !== null
            ? {
                latitude: data.latitude,
                longitude: data.longitude,
                label: data.location_label ?? ""
              }
            : null
      })

      setTimeout(() => {
        isPushingRef.current = false
      }, 0)
    }

    pull()
  }, [user])

  useEffect(() => {
    if (!user || isPushingRef.current) return

    const timeout = setTimeout(async () => {
      const supabase = createClient()

      await supabase.from("settings").upsert({
        user_id: user.id,
        calculation_method: "dagestan",
        latitude: coordinates?.latitude ?? null,
        longitude: coordinates?.longitude ?? null,
        location_label: coordinates?.label ?? null,
        language,
        updated_at: new Date().toISOString()
      })
    }, 800)

    return () => clearTimeout(timeout)
  }, [user, coordinates, language])
}