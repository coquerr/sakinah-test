"use client"

import { useEffect, useState, useCallback } from "react"

export type CompassAccuracy = "high" | "medium" | "low" | "unknown"

interface OrientationState {
  heading: number | null
  accuracy: CompassAccuracy
  permissionState: "unknown" | "granted" | "denied" | "unsupported"
  requestPermission: () => Promise<void>
}

export function useDeviceOrientation(): OrientationState {
  const [heading, setHeading] = useState<number | null>(null)
  const [accuracy, setAccuracy] = useState<CompassAccuracy>("unknown")
  const [permissionState, setPermissionState] = useState<OrientationState["permissionState"]>("unknown")

  const handleOrientation = useCallback((event: any) => {
    let currentHeading: number | null = null
    let currentAccuracy: CompassAccuracy = "unknown"

    // 1. iOS: использует webkitCompassHeading
    if (typeof event.webkitCompassHeading === "number") {
      currentHeading = event.webkitCompassHeading
      const acc = event.webkitCompassAccuracy ?? -1
      if (acc < 0) currentAccuracy = "unknown"
      else if (acc <= 15) currentAccuracy = "high"
      else if (acc <= 50) currentAccuracy = "medium"
      else currentAccuracy = "low"
    }
    // 2. Android: отдает alpha (0 = Север, идет против часовой)
    else if (event.alpha !== null) {
      // Для Android истинный север доступен, если событие absolute
      if (event.type === "deviceorientationabsolute" || event.absolute) {
        currentHeading = (360 - event.alpha) % 360
        currentAccuracy = "high"
      } else {
        // Обычный компас (может требовать калибровки восьмеркой)
        currentHeading = (360 - event.alpha) % 360
        currentAccuracy = "low"
      }
    }

    // Обновляем стейт только если удалось извлечь реальный угол
    if (currentHeading !== null) {
      // Корректировка на поворот экрана (портрет/ландшафт)
      let screenAngle = 0
      if (typeof window.screen?.orientation?.angle === "number") {
        screenAngle = window.screen.orientation.angle
      } else if (typeof window.orientation === "number") {
        screenAngle = window.orientation
      }

      // Итоговый угол поворота телефона
      currentHeading = (currentHeading + screenAngle + 360) % 360
      
      setHeading(currentHeading)
      setAccuracy(currentAccuracy)
    }
  }, [])

  const startListening = useCallback(() => {
    if (typeof window === "undefined") return
    
    // Подписываемся на оба события, браузер сам пришлет нужное
    window.addEventListener("deviceorientationabsolute", handleOrientation, true)
    window.addEventListener("deviceorientation", handleOrientation, true)
  }, [handleOrientation])

  const requestPermission = useCallback(async () => {
    if (typeof window === "undefined" || !window.DeviceOrientationEvent) {
      setPermissionState("unsupported")
      return
    }

    const EventConstructor = window.DeviceOrientationEvent as any

    // Для iOS 13+ (требует разрешения)
    if (typeof EventConstructor.requestPermission === "function") {
      try {
        const permission = await EventConstructor.requestPermission()
        if (permission === "granted") {
          setPermissionState("granted")
          startListening()
        } else {
          setPermissionState("denied")
        }
      } catch (error) {
        setPermissionState("denied")
      }
    } else {
      // Android / старые браузеры
      setPermissionState("granted")
      startListening()
    }
  }, [startListening])

  // Автоматический старт для Android при загрузке страницы
  useEffect(() => {
    if (typeof window === "undefined") return
    
    if (!window.DeviceOrientationEvent) {
      setPermissionState("unsupported")
      return
    }

    const EventConstructor = window.DeviceOrientationEvent as any
    // Если браузер Android (не требует клика), запускаем сразу
    if (typeof EventConstructor.requestPermission !== "function") {
      setPermissionState("granted")
      startListening()
    }

    return () => {
      window.removeEventListener("deviceorientationabsolute", handleOrientation, true)
      window.removeEventListener("deviceorientation", handleOrientation, true)
    }
  }, [handleOrientation, startListening])

  return { heading, accuracy, permissionState, requestPermission }
}