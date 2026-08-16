"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils/cn"
import { ExternalResourceCategory } from "@/types/external-resource"

export function ExternalResourceCard({
  category,
  index
}: {
  category: ExternalResourceCategory
  index: number
}) {
  const Icon = category.icon
  const isAccent = category.tone === "accent"

  return (
    <motion.a
      href={category.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: "easeOut" }}
      whileTap={{ scale: 0.98 }}
      className="group flex items-center gap-4 rounded-2xl border border-border/60 bg-surface p-4 shadow-card transition-colors hover:border-primary/30 hover:bg-surface-hover"
    >
      <div
        className={cn(
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
          isAccent ? "bg-accent/12" : "bg-primary/10"
        )}
      >
        <Icon size={20} className={isAccent ? "text-accent" : "text-primary"} />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-foreground">{category.title}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{category.description}</p>
      </div>
      <ArrowUpRight
        size={16}
        className="shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
      />
    </motion.a>
  )
}