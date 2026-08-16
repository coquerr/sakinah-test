import { LucideIcon } from "lucide-react"
import { TranslationKey } from "@/lib/i18n"

export interface NavItem {
  href: string
  labelKey: TranslationKey
  icon: LucideIcon
}