import { Language } from "@/types/settings"
import { hijriMonthNames } from "@/lib/constants/hijri-months"

export const hijriMonthsByLanguage: Record<Language, string[]> = {
  ru: hijriMonthNames,
  en: [
    "Muharram", "Safar", "Rabi al-awwal", "Rabi al-thani",
    "Jumada al-awwal", "Jumada al-thani", "Rajab", "Shaban",
    "Ramadan", "Shawwal", "Dhu al-Qidah", "Dhu al-Hijjah"
  ],
  ar: [
    "محرم", "صفر", "ربيع الأول", "ربيع الآخر",
    "جمادى الأولى", "جمادى الآخرة", "رجب", "شعبان",
    "رمضان", "شوال", "ذو القعدة", "ذو الحجة"
  ]
}