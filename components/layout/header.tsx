"use client"

import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { pageTitles } from "@/lib/constants/page-titles"
import { useTranslation } from "@/hooks/use-translation"

export function Header() {
  const pathname = usePathname()
  const { t } = useTranslation()
  const titleKey = pageTitles[pathname]
  const title = titleKey ? t(titleKey) : t("common.appName")

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-md items-center justify-between px-6 py-4">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={pathname}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="font-heading text-lg font-semibold tracking-tight text-foreground"
          >
            {title}
          </motion.span>
        </AnimatePresence>
        <ThemeToggle />
      </div>
    </header>
  )
}