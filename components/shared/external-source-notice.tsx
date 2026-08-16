"use client"

import { motion } from "framer-motion"
import { Info } from "lucide-react"

export function ExternalSourceNotice({ sourceName }: { sourceName: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="flex items-start gap-2 rounded-xl border border-border-subtle bg-muted/60 px-4 py-3"
    >
      <Info size={14} className="mt-0.5 shrink-0 text-muted-foreground" />
      <p className="text-xs leading-relaxed text-muted-foreground">
        Тексты азкаров открываются на {sourceName} — проверенном источнике хадисов и дуа, чтобы
        сохранить точность и достоверность содержания.
      </p>
    </motion.div>
  )
}