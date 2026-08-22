"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ShieldCheck, X } from "lucide-react"
import { usePrivacyNoticeStore } from "@/store/privacy-notice-store"
import { useTranslation } from "@/hooks/use-translation"

export function LocalDataNotice() {
  const dismissed = usePrivacyNoticeStore((state) => state.dismissed)
  const dismiss = usePrivacyNoticeStore((state) => state.dismiss)
  const { t } = useTranslation()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    usePrivacyNoticeStore.persist.rehydrate()
    setMounted(true)
  }, [])

  if (!mounted || dismissed) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="fixed inset-x-4 bottom-20 z-50 mx-auto flex max-w-md items-start gap-3 rounded-2xl border border-border/60 bg-surface p-4 shadow-card sm:bottom-6"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
          <ShieldCheck size={16} className="text-primary" />
        </span>
        <p className="flex-1 text-xs leading-relaxed text-muted-foreground">
          {t("privacyBanner.text")}
        </p>
        <button
          onClick={dismiss}
          aria-label={t("privacyBanner.dismiss")}
          className="shrink-0 rounded-full p-1 text-muted-foreground transition-colors hover:bg-surface-hover hover:text-foreground"
        >
          <X size={15} />
        </button>
      </motion.div>
    </AnimatePresence>
  )
}