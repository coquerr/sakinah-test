"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Navigation, Landmark, RotateCw, CheckCircle2 } from "lucide-react"
import { useGeolocation } from "@/hooks/use-geolocation"
import { useDeviceOrientation } from "@/hooks/use-device-orientation"
import { getQiblaDirection, getDistanceToKaaba, getCompassPoint } from "@/lib/utils/qibla"
import { useTranslation } from "@/hooks/use-translation"
import { localeMap } from "@/lib/i18n"
import { cn } from "@/lib/utils/cn"

const springTransition = { type: "spring" as const, stiffness: 60, damping: 16 }
const ticks = Array.from({ length: 24 }, (_, index) => index * 15)
const ALIGNMENT_THRESHOLD_DEG = 5

export function QiblaCompass() {
  const { coordinates, status } = useGeolocation()
  const { heading, accuracy, permissionState, requestPermission } = useDeviceOrientation()
  const { t, language } = useTranslation()
  const locale = localeMap[language]
  const [showCalibration, setShowCalibration] = useState(false)

  if (status === "loading" || !coordinates) {
    return (
      <div className="flex h-[320px] items-center justify-center rounded-2xl border border-border/60 bg-surface shadow-card">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  const qiblaAngle = getQiblaDirection(coordinates.latitude, coordinates.longitude)
  const distanceKm = getDistanceToKaaba(coordinates.latitude, coordinates.longitude)
  const compassPoint = getCompassPoint(qiblaAngle)
  const deviceHeading = heading ?? 0
  const arrowRotation = qiblaAngle - deviceHeading

  const wrappedDiff = ((arrowRotation % 360) + 540) % 360 - 180
  const closeness = Math.max(0, 1 - Math.abs(wrappedDiff) / 30)
  const aligned = heading !== null && Math.abs(wrappedDiff) <= ALIGNMENT_THRESHOLD_DEG

  const directionLabels = [
    { angle: 0, label: t("qibla.north") },
    { angle: 90, label: t("qibla.east") },
    { angle: 180, label: t("qibla.south") },
    { angle: 270, label: t("qibla.west") }
  ]

  const accuracyDotClass = {
    high: "bg-primary",
    medium: "bg-accent",
    low: "bg-red-400",
    unknown: "bg-muted-foreground/50"
  }[accuracy]

  const accuracyLabel = {
    high: t("qibla.accuracyHigh"),
    medium: t("qibla.accuracyMedium"),
    low: t("qibla.accuracyLow"),
    unknown: t("qibla.accuracyUnknown")
  }[accuracy]

  return (
    <div className="space-y-4">
      <div className="relative flex flex-col items-center overflow-hidden rounded-2xl border border-border/60 bg-surface p-6 shadow-card">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 bg-glow-primary" />

        <p className="relative text-xs text-red-400">
          DEBUG: lat={coordinates.latitude.toFixed(4)} lon={coordinates.longitude.toFixed(4)}{" "}
          heading={heading?.toFixed(1) ?? "null"} qibla={qiblaAngle.toFixed(1)}{" "}
          rotation={arrowRotation.toFixed(1)} accuracy={accuracy}
        </p>

        <div
          className="relative mt-8 flex items-center justify-center"
          style={{ width: "min(78vw, 320px)", height: "min(78vw, 320px)" }}
        >
          <div className="absolute inset-0 rounded-full border border-border/60" />
          <div className="absolute inset-4 rounded-full border border-dashed border-border-subtle" />

          {ticks.map((angle) => (
            <motion.span
              key={angle}
              className="absolute inset-0"
              animate={{ rotate: angle - deviceHeading }}
              transition={springTransition}
            >
              <span
                className={
                  angle % 90 === 0
                    ? "absolute left-1/2 top-1 h-2.5 w-[1.5px] -translate-x-1/2 bg-muted-foreground/50"
                    : "absolute left-1/2 top-1 h-1.5 w-px -translate-x-1/2 bg-muted-foreground/25"
                }
              />
            </motion.span>
          ))}

          {directionLabels.map(({ angle, label }) => (
            <motion.span
              key={label}
              className="absolute inset-0"
              animate={{ rotate: angle - deviceHeading }}
              transition={springTransition}
            >
              <motion.span
                className="absolute left-1/2 top-4 -translate-x-1/2 text-xs font-medium text-muted-foreground"
                animate={{ rotate: -(angle - deviceHeading) }}
                transition={springTransition}
              >
                {label}
              </motion.span>
            </motion.span>
          ))}

          <motion.span
            className="absolute inset-0"
            animate={{ rotate: qiblaAngle - deviceHeading }}
            transition={springTransition}
          >
            <span className="absolute left-1/2 top-1/2 h-[calc(50%-14px)] w-px -translate-x-1/2 -translate-y-full origin-bottom bg-gradient-to-t from-transparent to-accent/50" />
            <span className="absolute left-1/2 top-2 h-3 w-3 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_10px_2px_hsl(var(--accent)/0.5)]" />
          </motion.span>

          <div
            className="flex h-full w-full items-center justify-center transition-transform duration-500 ease-out"
            style={{ transform: `rotate(${arrowRotation}deg)` }}
          >
            <Navigation
              size={64}
              strokeWidth={1}
              className={cn("transition-colors", aligned ? "fill-accent text-accent" : "fill-primary text-primary")}
            />
          </div>

          <div className="absolute h-3 w-3 rounded-full bg-accent" />
        </div>
        
        <div className="relative mt-6 flex flex-col items-center">
          <span className="font-heading text-4xl font-semibold tabular-nums text-foreground">
            {Math.round(qiblaAngle)}°
          </span>
          <span className="mt-1 text-xs text-muted-foreground">{t("qibla.fromNorth")}</span>

          <AnimatePresence mode="wait">
            {aligned ? (
              <motion.div
                key="aligned"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                className="mt-3 flex items-center gap-1.5 rounded-full bg-accent/12 px-3 py-1.5 text-xs font-medium text-accent"
              >
                <CheckCircle2 size={14} />
                {t("qibla.aligned")}
              </motion.div>
            ) : (
              <motion.span
                key="direction"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="mt-2 text-sm font-medium text-primary"
              >
                {t(`qibla.directions.${compassPoint}`)}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {permissionState !== "granted" && permissionState !== "unsupported" && (
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={requestPermission}
            className="relative mt-5 rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-opacity active:opacity-80"
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

      {permissionState === "granted" && (
        <div className="rounded-2xl border border-border/60 bg-surface p-5 shadow-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={cn("h-2 w-2 rounded-full", accuracyDotClass)} />
              <span className="text-sm text-foreground">{accuracyLabel}</span>
            </div>
            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={() => setShowCalibration((prev) => !prev)}
              className="flex items-center gap-1.5 text-xs font-medium text-primary"
            >
              <RotateCw size={14} />
              {t("qibla.calibrateButton")}
            </motion.button>
          </div>

          {(accuracy === "medium" || accuracy === "low") && (
            <p className="mt-2 text-xs text-muted-foreground">{t("qibla.calibrationHint")}</p>
          )}

          <AnimatePresence>
            {showCalibration && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="mt-3 overflow-hidden text-xs leading-relaxed text-muted-foreground"
              >
                {t("qibla.calibrateInstructions")}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      )}

      <div className="flex items-center gap-4 rounded-2xl border border-border/60 bg-surface p-5 shadow-card">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/12">
          <Landmark size={20} className="text-accent" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            {t("qibla.distanceLabel")}
          </p>
          <p className="mt-0.5 font-heading text-xl font-semibold tabular-nums text-foreground">
            ≈ {Math.round(distanceKm).toLocaleString(locale)} км
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">{t("qibla.distanceCity")}</p>
        </div>
      </div>
    </div>
  )
}