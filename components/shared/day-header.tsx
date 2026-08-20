"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { MapPin } from "lucide-react"
import { getGreeting } from "@/lib/utils/greeting"
import { useGeolocation } from "@/hooks/use-geolocation"
import { useTranslation } from "@/hooks/use-translation"
import { localeMap } from "@/lib/i18n"

export function DayHeader() {
  const { t, language } = useTranslation()
  const { coordinates } = useGeolocation()
  const now = useMemo(() => new Date(), [])
  const locale = localeMap[language]

  const weekdayLabel = now.toLocaleDateString(locale, { weekday: "long" })

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mb-5"
    >
      <p className="font-heading text-2xl font-semibold tracking-tight text-foreground">
        {t(getGreeting(now))}
      </p>
      {coordinates?.label && (
        <div className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin size={12} className="shrink-0 text-primary/70" />
          <span>
            {coordinates.label} · {t("calendar.today")}, {weekdayLabel}
          </span>
        </div>
      )}
    </motion.div>
  )
}