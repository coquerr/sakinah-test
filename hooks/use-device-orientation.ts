"use client"

import { useEffect, useState } from "react"

interface OrientationState {
  heading: number | null
  permissionState: "unknown" | "granted" | "denied" | "unsupported"
  requestPermission: () => Promise<void>
}

type DeviceOrientationEventWithPermission = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<"granted" | "denied">
}

export function useDeviceOrientation(): OrientationState {
  const [heading, setHeading] = useState<number | null>(null)
  const [permissionState, setPermissionState] = useState<OrientationState["permissionState"]>(
    "unknown"
  )

  useEffect(() => {
    if (typeof DeviceOrientationEvent === "undefined") {
      setPermissionState("unsupported")
      return
    }

    const handleOrientation = (event: DeviceOrientationEvent) => {
      const webkitEvent = event as DeviceOrientationEvent & { webkitCompassHeading?: number }

      if (typeof webkitEvent.webkitCompassHeading === "number") {
        setHeading(webkitEvent.webkitCompassHeading)
      } else if (event.alpha !== null) {
        setHeading(360 - event.alpha)
      }
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
          const webkitEvent = event as DeviceOrientationEvent & { webkitCompassHeading?: number }

          if (typeof webkitEvent.webkitCompassHeading === "number") {
            setHeading(webkitEvent.webkitCompassHeading)
          } else if (event.alpha !== null) {
            setHeading(360 - event.alpha)
          }
        })
      } else {
        setPermissionState("denied")
      }
    } catch {
      setPermissionState("denied")
    }
  }

  return { heading, permissionState, requestPermission }
}