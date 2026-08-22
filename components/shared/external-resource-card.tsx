"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, Heart } from "lucide-react"
import { cn } from "@/lib/utils/cn"
import { ExternalResourceCategory } from "@/types/external-resource"

interface ExternalResourceCardProps {
  category: ExternalResourceCategory
  index: number
  isFavorite?: boolean
  onToggleFavorite?: () => void
}

export function ExternalResourceCard({
  category,
  index,
  isFavorite,
  onToggleFavorite
}: ExternalResourceCardProps) {
  const Icon = category.icon
  const isAccent = category.tone === "accent"
  const sourceHost = new URL(category.href).hostname.replace("www.", "")

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

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-foreground">{category.title}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{category.description}</p>
      </div>

      <div className="flex shrink-0 flex-col items-center gap-2">
        {onToggleFavorite && (
          <button
            type="button"
            onClick={(event) => {
              event.preventDefault()
              event.stopPropagation()
              onToggleFavorite()
            }}
            aria-label="favorite"
            className="flex h-6 w-6 items-center justify-center transition-transform hover:scale-110"
          >
            <Heart
              size={15}
              className={isFavorite ? "fill-primary text-primary" : "text-muted-foreground"}
            />
          </button>
        )}

        <div className="relative flex flex-col items-center">
          <ArrowUpRight
            size={16}
            className="text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
          />
          <span className="pointer-events-none absolute top-full mt-1 whitespace-nowrap text-[11px] text-muted-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            {sourceHost}
          </span>
        </div>
      </div>
    </motion.a>
  )
}