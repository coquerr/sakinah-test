"use client"

import { motion } from "framer-motion"
import { Navigation } from "lucide-react"
import { useGeolocation } from "@/hooks/use-geolocation"
import { useDeviceOrientation } from "@/hooks/use-device-orientation"
import { getQiblaDirection } from "@/lib/utils/qibla"
import { useTranslation } from "@/hooks/use-translation"

const ticks = Array.from({ length: 24 }, (_, index) => index * 15)

export function QiblaCompass() {
  const { coordinates, status } = useGeolocation()
  const { heading, permissionState, requestPermission } = useDeviceOrientation()
  const { t } = useTranslation()

  if (status === "loading" || !coordinates) {
    return (
      <div className="flex h-[320px] items-center justify-center rounded-2xl border border-border/60 bg-surface shadow-card">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  const qiblaAngle = getQiblaDirection(coordinates.latitude, coordinates.longitude)
  const deviceHeading = heading ?? 0
  const arrowRotation = qiblaAngle - deviceHeading

  const directionLabels = [
    t("qibla.north"),
    t("qibla.east"),
    t("qibla.south"),
    t("qibla.west")
  ]

  return (
    <div className="relative flex flex-col items-center overflow-hidden rounded-2xl border border-border/60 bg-surface p-6 shadow-card">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 bg-glow-primary" />

      <p className="relative text-sm text-muted-foreground">{t("qibla.subtitle")}</p>

      <div className="relative mt-8 flex h-64 w-64 items-center justify-center">
        <div className="absolute inset-0 rounded-full border border-border/60" />
        <div className="absolute inset-4 rounded-full border border-dashed border-border-subtle" />

        {ticks.map((angle) => (
          <span
            key={angle}
            className="absolute h-full w-full"
            style={{ transform: `rotate(${angle - deviceHeading}deg)` }}
          >
            <span
              className={
                angle % 90 === 0
                  ? "absolute left-1/2 top-1 h-2.5 w-[1.5px] -translate-x-1/2 bg-muted-foreground/50"
                  : "absolute left-1/2 top-1 h-1.5 w-px -translate-x-1/2 bg-muted-foreground/25"
              }
            />
          </span>
        ))}

        {directionLabels.map((label, index) => (
          <span
            key={label}
            className="absolute text-xs font-medium text-muted-foreground"
            style={{
              transform: `rotate(${index * 90 - deviceHeading}deg) translateY(-118px) rotate(${-(index * 90 - deviceHeading)}deg)`
            }}
          >
            {label}
          </span>
        ))}

        <motion.div
          animate={{ rotate: arrowRotation }}
          transition={{ type: "spring", stiffness: 60, damping: 14 }}
          className="flex h-full w-full items-center justify-center"
        >
          <div className="flex flex-col items-center">
            <Navigation size={48} className="fill-primary text-primary" strokeWidth={1} />
          </div>
        </motion.div>

        <div className="absolute h-3 w-3 rounded-full bg-accent" />
      </div>

      <div className="relative mt-6 rounded-full bg-muted px-4 py-1.5">
        <p className="text-sm tabular-nums text-muted-foreground">
          {qiblaAngle.toFixed(0)}° {t("qibla.fromNorth")}
        </p>
      </div>

      {permissionState !== "granted" && permissionState !== "unsupported" && (
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={requestPermission}
          className="relative mt-4 rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-opacity active:opacity-80"
        >
          {t("qibla.enableCompass")}
        </motion.button>
      )}

      {permissionState === "unsupported" && (
        <p className="relative mt-4 text-center text-xs text-muted-foreground">
          {t("qibla.unsupported")}
        </p>
      )}
    </div>
  )
}