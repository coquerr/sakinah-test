"use client"

import { useEffect, useState } from "react"
import { useSettingsStore } from "@/store/settings-store"

const FALLBACK_COORDINATES = { latitude: 21.4225, longitude: 39.8262, label: "Мекка" }

export function useGeolocation() {
  const coordinates = useSettingsStore((state) => state.coordinates)
  const setCoordinates = useSettingsStore((state) => state.setCoordinates)
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">("idle")

  useEffect(() => {
    if (coordinates) {
      setStatus("ready")
      return
    }

    if (!navigator.geolocation) {
      setCoordinates(FALLBACK_COORDINATES)
      setStatus("ready")
      return
    }

    setStatus("loading")

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          label: "Текущее местоположение"
        })
        setStatus("ready")
      },
      () => {
        setCoordinates(FALLBACK_COORDINATES)
        setStatus("error")
      },
      { enableHighAccuracy: false, timeout: 8000 }
    )
  }, [coordinates, setCoordinates])

  return { coordinates, status }
}