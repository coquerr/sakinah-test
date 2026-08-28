"use client"

import { useSettingsStore } from "@/store/settings-store"
import { regionConfigs, RegionId } from "@/lib/constants/region-configs"
import { cn } from "@/lib/utils/cn"

export function RegionSelector() {
  const { regionId, setRegionId } = useSettingsStore()

  return (
    <div className="rounded-2xl border border-border/60 bg-surface p-4 shadow-card">
      <h3 className="mb-3 text-sm font-semibold text-foreground">Регион расчета</h3>
      <div className="flex flex-col gap-2">
        {(Object.keys(regionConfigs) as RegionId[]).map((key) => {
          const region = regionConfigs[key]
          const isActive = regionId === key

          return (
            <button
              key={key}
              onClick={() => setRegionId(key)}
              className={cn(
                "flex items-center justify-between rounded-xl px-4 py-3 text-left transition-colors",
                isActive
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "bg-background text-foreground hover:bg-surface-hover border border-transparent"
              )}
            >
              <span className="text-sm font-medium">{region.name}</span>
              {isActive && (
                <div className="h-2 w-2 rounded-full bg-primary" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}