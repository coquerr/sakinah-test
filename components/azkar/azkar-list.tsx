"use client"

import { useState } from "react"
import { Search, X, Heart } from "lucide-react"
import { azkarCategories } from "@/lib/constants/azkar-categories"
import { ExternalResourceCard } from "@/components/shared/external-resource-card"
import { ExternalResourceGroup } from "@/types/external-resource"
import { matchesAzkarQuery } from "@/lib/utils/azkar-search"
import { useTranslation } from "@/hooks/use-translation"
import { useAzkarFavoritesStore } from "@/store/azkar-favorites-store"
import { cn } from "@/lib/utils/cn"

const GROUP_ORDER: ExternalResourceGroup[] = ["daily", "everyday", "special"]

const QUICK_CATEGORY_IDS = ["morning", "evening", "sleep", "home", "protection"] as const

type Tab = "all" | "favorites"

export function AzkarList() {
  const { t } = useTranslation()
  const [query, setQuery] = useState("")
  const [tab, setTab] = useState<Tab>("all")
  const favoriteIds = useAzkarFavoritesStore((state) => state.ids)
  const toggleFavorite = useAzkarFavoritesStore((state) => state.toggleFavorite)

  const bySearch = azkarCategories.filter((category) => matchesAzkarQuery(category, query))
  const filtered =
    tab === "favorites" ? bySearch.filter((category) => favoriteIds.includes(category.id)) : bySearch

  return (
    <div>
      <div className="relative">
        <Search
          size={18}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t("azkar.searchPlaceholder")}
          className="w-full rounded-2xl border border-border/60 bg-surface py-3.5 pl-11 pr-11 text-base text-foreground shadow-card outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            aria-label={t("azkar.clearSearch")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
        {QUICK_CATEGORY_IDS.map((id) => {
          const category = azkarCategories.find((item) => item.id === id)
          if (!category) return null

          const isActive = query === category.title

          return (
            <button
              key={id}
              onClick={() => setQuery(isActive ? "" : category.title)}
              className={cn(
                "shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                isActive
                  ? "border-primary/30 bg-primary/10 text-primary"
                  : "border-border/60 bg-surface text-muted-foreground hover:bg-surface-hover"
              )}
            >
              {t(`azkar.quickLabels.${id}`)}
            </button>
          )
        })}
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => setTab("all")}
          className={cn(
            "rounded-full border px-4 py-1.5 text-xs font-medium transition-colors",
            tab === "all"
              ? "border-primary/30 bg-primary/10 text-primary"
              : "border-border/60 bg-surface text-muted-foreground hover:bg-surface-hover"
          )}
        >
          {t("azkar.tabs.all")}
        </button>
        <button
          onClick={() => setTab("favorites")}
          className={cn(
            "rounded-full border px-4 py-1.5 text-xs font-medium transition-colors",
            tab === "favorites"
              ? "border-primary/30 bg-primary/10 text-primary"
              : "border-border/60 bg-surface text-muted-foreground hover:bg-surface-hover"
          )}
        >
          {t("azkar.tabs.favorites")} · {favoriteIds.length}
        </button>
      </div>

      <div className="mt-5 space-y-6">
        {filtered.length === 0 ? (
          tab === "favorites" && !query ? (
            <div className="flex flex-col items-center gap-2 py-14 text-center">
              <Heart size={22} className="text-muted-foreground" />
              <p className="text-sm font-medium text-foreground">{t("azkar.emptyFavoritesTitle")}</p>
              <p className="max-w-[220px] text-xs text-muted-foreground">
                {t("azkar.emptyFavoritesText")}
              </p>
            </div>
          ) : (
            <p className="py-10 text-center text-sm text-muted-foreground">{t("azkar.noResults")}</p>
          )
        ) : (
          GROUP_ORDER.map((group) => {
            const categories = filtered.filter((category) => category.group === group)
            if (categories.length === 0) return null

            return (
              <div key={group}>
                <h3 className="mb-2.5 text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground">
                  {t(`azkar.groups.${group}`)}
                </h3>
                <div className="space-y-2">
                  {categories.map((category, index) => (
                    <ExternalResourceCard
                      key={category.id}
                      category={category}
                      index={index}
                      isFavorite={favoriteIds.includes(category.id)}
                      onToggleFavorite={() => toggleFavorite(category.id)}
                    />
                  ))}
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}