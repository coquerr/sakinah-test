"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, MapPin } from "lucide-react"
import { useCitySearch } from "@/hooks/use-city-search"
import { useSettingsStore } from "@/store/settings-store"
import { useTranslation } from "@/hooks/use-translation"

export function CitySearch() {
  const [query, setQuery] = useState("")
  const { results, loading } = useCitySearch(query)
  const setCoordinates = useSettingsStore((state) => state.setCoordinates)
  const currentLabel = useSettingsStore((state) => state.coordinates?.label)
  const { t } = useTranslation()

  return (
    <div className="rounded-2xl border border-border/60 bg-surface p-5 shadow-card">
      <div className="flex items-center gap-2">
        <MapPin size={16} className="text-primary" />
        <span className="text-sm font-medium text-foreground">
          {t("settings.location.title")}
        </span>
      </div>

      <p className="mt-1 text-xs text-muted-foreground">
        {currentLabel
          ? `${t("settings.location.currentPrefix")}: ${currentLabel}`
          : t("settings.location.notSelected")}
      </p>
      <p className="mt-1 text-[11px] text-muted-foreground/70">
        Местоположение используется только на вашем устройстве для расчёта времени намаза и не
        передаётся на сервер
      </p>

      <div className="relative mt-3">
        <Search
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t("settings.location.placeholder")}
          className="w-full rounded-xl border border-border/60 bg-background py-2.5 pl-9 pr-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15"
        />
      </div>

      <AnimatePresence>
        {(results.length > 0 || loading) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2 overflow-hidden rounded-xl border border-border/60"
          >
            {loading && (
              <div className="px-4 py-3 text-xs text-muted-foreground">
                {t("settings.location.searching")}
              </div>
            )}
            {results.map((city) => (
              <button
                key={`${city.name}-${city.latitude}-${city.longitude}`}
                onClick={() => {
                  setCoordinates({
                    latitude: city.latitude,
                    longitude: city.longitude,
                    label: `${city.name}, ${city.country}`
                  })
                  setQuery("")
                }}
                className="flex w-full items-center justify-between border-t border-border-subtle px-4 py-2.5 text-left text-sm transition-colors first:border-t-0 hover:bg-surface-hover"
              >
                <span className="text-foreground">{city.name}</span>
                <span className="text-xs text-muted-foreground">{city.country}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}