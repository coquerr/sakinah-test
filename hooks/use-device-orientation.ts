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

  useEffect(() => {
    if (typeof DeviceOrientationEvent === "undefined") {
      setPermissionState("unsupported")
      return
    }

    const handleOrientation = (event: DeviceOrientationEvent) => {
      const compassEvent = event as CompassOrientationEvent

      if (typeof compassEvent.webkitCompassHeading === "number") {
        setHeading(compassEvent.webkitCompassHeading)
      } else if (event.alpha !== null) {
        setHeading(360 - event.alpha)
      }

      setAccuracy(resolveAccuracy(compassEvent))
    }

    const eventConstructor = DeviceOrientationEvent as DeviceOrientationEventWithPermission

    if (typeof eventConstructor.requestPermission === "function") {
      return
    }

    window.addEventListener("deviceorientation", handleOrientation)
    setPermissionState("granted")

    return () => window.removeEventListener("deviceorientation", handleOrientation)
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

        window.addEventListener("deviceorientation", (event) => {
          const compassEvent = event as CompassOrientationEvent

          if (typeof compassEvent.webkitCompassHeading === "number") {
            setHeading(compassEvent.webkitCompassHeading)
          } else if (event.alpha !== null) {
            setHeading(360 - event.alpha)
          }

          setAccuracy(resolveAccuracy(compassEvent))
        })
      } else {
        setPermissionState("denied")
      }
    } catch {
      setPermissionState("denied")
    }
  }

  return { heading, accuracy, permissionState, requestPermission }
}