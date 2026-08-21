import { Sunrise, Sunset, Moon, Home, HandHeart, ShieldCheck } from "lucide-react"
import { ExternalResourceCategory } from "@/types/external-resource"

export const azkarCategories: ExternalResourceCategory[] = [
  {
    id: "morning",
    title: "Утренние азкары",
    description: "Поминания после Фаджра",
    href: "https://sunnah.com/search?q=morning+remembrance+dhikr",
    icon: Sunrise,
    tone: "accent",
    group: "daily"
  },
  {
    id: "evening",
    title: "Вечерние азкары",
    description: "Поминания после Асра",
    href: "https://sunnah.com/search?q=evening+remembrance+dhikr",
    icon: Sunset,
    tone: "primary",
    group: "daily"
  },
  {
    id: "sleep",
    title: "Перед сном",
    description: "Дуа перед сном",
    href: "https://sunnah.com/search?q=sleeping+dua",
    icon: Moon,
    tone: "primary",
    group: "daily"
  },
  {
    id: "home",
    title: "Вход и выход из дома",
    description: "Дуа для повседневных ситуаций",
    href: "https://sunnah.com/search?q=entering+house+dua",
    icon: Home,
    tone: "accent",
    group: "everyday"
  },
  {
    id: "distress",
    title: "В трудную минуту",
    description: "Дуа при тревоге и печали",
    href: "https://sunnah.com/search?q=grief+distress+dua",
    icon: HandHeart,
    tone: "primary",
    group: "special"
  },
  {
    id: "protection",
    title: "Защита и благополучие",
    description: "Дуа о защите и здоровье",
    href: "https://sunnah.com/search?q=protection+dua",
    icon: ShieldCheck,
    tone: "accent",
    group: "special"
  }
]