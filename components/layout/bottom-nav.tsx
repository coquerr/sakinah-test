"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { navItems } from "@/lib/constants/nav"
import { cn } from "@/lib/utils/cn"
import { useTranslation } from "@/hooks/use-translation"

export function BottomNav() {
  const pathname = usePathname()
  const { t } = useTranslation()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/60 bg-surface/85 backdrop-blur-lg">
      <div className="mx-auto flex max-w-md items-center justify-between px-3 pb-[calc(0.5rem+env(safe-area-inset-bottom))] pt-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative flex flex-1 flex-col items-center gap-1 py-1.5"
            >
              {isActive && (
                <motion.span
                  layoutId="nav-active-bg"
                  className="absolute inset-x-2 inset-y-0 rounded-2xl bg-primary/10"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <Icon
                size={20}
                strokeWidth={isActive ? 2.2 : 1.8}
                className={cn(
                  "relative transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              />
              <span
                className={cn(
                  "relative text-[11px] transition-colors",
                  isActive ? "font-medium text-primary" : "text-muted-foreground"
                )}
              >
                {t(item.labelKey)}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}