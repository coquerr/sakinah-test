"use client"

import { useEffect, useState } from "react"

export type CompassAccuracy = "high" | "medium" | "low" | "unknown"

interface OrientationState {
  heading: number | null
  accuracy: CompassAccuracy
  permissionState: "unknown" | "granted" | "denied" | "unsupported"
  requestPermission: () => Promise<void>
}

type DeviceOrientationEventWithPermission = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<"granted" | "denied">
}

type CompassOrientationEvent = DeviceOrientationEvent & {
  webkitCompassHeading?: number
  webkitCompassAccuracy?: number
}

function resolveAccuracy(event: CompassOrientationEvent): CompassAccuracy {
  if (typeof event.webkitCompassAccuracy === "number") {
    if (event.webkitCompassAccuracy < 0) return "unknown"
    if (event.webkitCompassAccuracy <= 15) return "high"
    if (event.webkitCompassAccuracy <= 50) return "medium"
    return "low"
  }

  if (event.absolute === true) return "high"
  if (event.alpha !== null) return "medium"

  return "unknown"
}

export function useDeviceOrientation(): OrientationState {
  const [heading, setHeading] = useState<number | null>(null)
  const [accuracy, setAccuracy] = useState<CompassAccuracy>("unknown")
  const [permissionState, setPermissionState] = useState<OrientationState["permissionState"]>(
    "unknown"
  )

  // 1. Выносим обработчик в отдельную функцию, чтобы избежать дублирования
  const handleOrientation = (event: Event) => {
    const compassEvent = event as CompassOrientationEvent
    let currentHeading: number | null = null

    // Считываем направление
    if (typeof compassEvent.webkitCompassHeading === "number") {
      // iOS
      currentHeading = compassEvent.webkitCompassHeading
    } else if (compassEvent.alpha !== null) {
      // Android
      currentHeading = (360 - compassEvent.alpha) % 360
    }

    // 2. Обязательно корректируем угол на поворот экрана
    if (currentHeading !== null) {
      const screenOrientation =
        typeof window.orientation === "number"
          ? window.orientation
          : window.screen?.orientation?.angle || 0

      currentHeading = (currentHeading + screenOrientation + 360) % 360
      setHeading(currentHeading)
    }

    setAccuracy(resolveAccuracy(compassEvent))
  }

  useEffect(() => {
    if (typeof window === "undefined" || typeof DeviceOrientationEvent === "undefined") {
      setPermissionState("unsupported")
      return
    }

    const eventConstructor = DeviceOrientationEvent as DeviceOrientationEventWithPermission

    if (typeof eventConstructor.requestPermission === "function") {
      return
    }

    // 3. Для Android проверяем поддержку абсолютных значений (для истинного компаса)
    const eventName = "ondeviceorientationabsolute" in window 
      ? "deviceorientationabsolute" 
      : "deviceorientation"

    window.addEventListener(eventName, handleOrientation)
    setPermissionState("granted")

    return () => window.removeEventListener(eventName, handleOrientation)
  }, [])

  const requestPermission = async () => {
    const eventConstructor = DeviceOrientationEvent as DeviceOrientationEventWithPermission

    if (typeof eventConstructor.requestPermission !== "function") {
      setPermissionState("granted")
      return
    }

    try {
      const result = await eventConstructor.requestPermission()

      if (result === "granted") {
        setPermissionState("granted")
        // iOS 13+ всегда использует standard deviceorientation
        window.addEventListener("deviceorientation", handleOrientation)
      } else {
        setPermissionState("denied")
      }
    } catch {
      setPermissionState("denied")
    }
  }

  return { heading, accuracy, permissionState, requestPermission }
}