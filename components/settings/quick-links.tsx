"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { CalendarDays, ChevronRight, BarChart3 } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"
import { TranslationKey } from "@/lib/i18n"

const links: { href: string; icon: typeof CalendarDays; labelKey: TranslationKey }[] = [
  { href: "/calendar", icon: CalendarDays, labelKey: "quickLinks.calendar" },
  { href: "/profile/tracker", icon: BarChart3, labelKey: "quickLinks.stats" }
]

export function QuickLinks() {
  const { t } = useTranslation()

  return (
    <div className="divide-y divide-border-subtle overflow-hidden rounded-2xl border border-border/60 bg-surface shadow-card">
      {links.map((link) => {
        const Icon = link.icon

        return (
          <Link key={link.href} href={link.href}>
            <motion.div
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-between px-5 py-4 transition-colors hover:bg-surface-hover"
            >
              <div className="flex items-center gap-3">
                <Icon size={18} className="text-primary" />
                <span className="text-sm text-foreground">{t(link.labelKey)}</span>
              </div>
              <ChevronRight size={16} className="text-muted-foreground" />
            </motion.div>
          </Link>
        )
      })}
    </div>
  )
}