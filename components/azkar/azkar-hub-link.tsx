"use client"

import { motion } from "framer-motion"
import { BookMarked, ArrowUpRight } from "lucide-react"

export function AzkarHubLink() {
  return (
    <motion.a
      href="https://sunnah.com/riyadussalihin/16"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      whileTap={{ scale: 0.98 }}
      className="group flex items-center gap-4 rounded-2xl border border-primary/25 bg-primary/5 p-4 shadow-card transition-colors hover:border-primary/40"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/15">
        <BookMarked size={20} className="text-primary" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-foreground">Книга Дуа целиком</p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Полный сборник из Рияд ас-Салихин
        </p>
      </div>
      <ArrowUpRight
        size={16}
        className="shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
      />
    </motion.a>
  )
}