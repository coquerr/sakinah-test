"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Compass, Rows3, Sparkles } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"

export function QuickActions() {
  const { t } = useTranslation()
  const router = useRouter()

  const handleScrollToList = () => {
    document.getElementById("prayer-list")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const items = [
    { icon: Compass, label: t("home.quickActions.qibla"), onClick: () => router.push("/qibla") },
    { icon: Rows3, label: t("home.quickActions.allPrayers"), onClick: handleScrollToList },
    { icon: Sparkles, label: t("home.quickActions.azkar"), onClick: () => router.push("/azkar") }
  ]

  return (
    <div className="mt-4 grid grid-cols-3 gap-3">
      {items.map((item, index) => {
        const Icon = item.icon

        return (
          <motion.button
            key={item.label}
            type="button"
            onClick={item.onClick}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 + index * 0.05 }}
            className="flex flex-col items-center gap-1.5 rounded-xl border border-border/60 bg-surface p-3 text-center shadow-card transition-colors hover:bg-surface-hover"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Icon size={18} strokeWidth={1.75} />
            </span>
            <span className="text-xs font-medium text-foreground">{item.label}</span>
          </motion.button>
        )
      })}
    </div>
  )
}