import { Dictionary } from "../types"

export const ar: Dictionary = {
  common: {
    appName: "سكينة"
  },
  nav: {
    home: "الرئيسية",
    quran: "القرآن",
    azkar: "الأذكار",
    qibla: "القبلة",
    profile: "الملف الشخصي"
  },
  settings: {
    languageTitle: "لغة الواجهة",
    location: {
      title: "الموقع",
      currentPrefix: "المدينة الحالية",
      notSelected: "لم يتم اختيار مدينة",
      placeholder: "أدخل اسم المدينة",
      searching: "جارٍ البحث..."
    },
    method: {
      title: "طريقة الحساب"
    }
  },
  account: {
    title: "الحساب",
    subtitle: "سجّل الدخول لمزامنة إعداداتك بين الأجهزة",
    emailPlaceholder: "بريدك الإلكتروني",
    sendLink: "إرسال رابط الدخول",
    sending: "جارٍ الإرسال...",
    synced: "تمت المزامنة",
    linkSent: "تم إرسال الرابط. تحقق من بريدك.",
    error: "تعذر إرسال الرابط. حاول مرة أخرى.",
    signOut: "تسجيل الخروج"
  },
  greeting: {
    morning: "صباح الخير",
    afternoon: "نهارك سعيد",
    evening: "مساء الخير",
    night: "ليلة سعيدة"
  },
  prayer: {
    fajr: "الفجر",
    sunrise: "الشروق",
    dhuhr: "الظهر",
    asr: "العصر",
    maghrib: "المغرب",
    isha: "العشاء",
    next: "الصلاة القادمة",
    at: "في",
    tracker: {
      title: "متابعة صلوات اليوم",
      markDone: "تحديد كمنجزة",
      markMissed: "تحديد كفائتة"
    }
  },
  qibla: {
    subtitle: "اتجاه الكعبة من موقعك",
    north: "ش",
    east: "ق",
    south: "ج",
    west: "غ",
    fromNorth: "من الشمال",
    accuracyHigh: "دقة عالية",
   accuracyMedium: "دقة متوسطة",
   accuracyLow: "دقة منخفضة",
   accuracyUnknown: "الدقة غير متوفرة",
   calibrationHint: "قم بتدوير هاتفك عدة مرات للمعايرة",
   calibrateButton: "معايرة",
   calibrateInstructions: "حرّك هاتفك على شكل الرقم ثمانية لمعايرة حساس البوصلة.",
   aligned: "أنت متجه نحو القبلة",
    enableCompass: "السماح بالوصول إلى البوصلة",
    unsupported: "جهازك لا يدعم مستشعر الاتجاه. يوضح السهم الاتجاه بالنسبة للشمال.",
    distanceLabel: "المسافة إلى الكعبة",
   distanceCity: "مكة المكرمة، السعودية",
   directions: {
     n: "الشمال",
     ne: "الشمال الشرقي",
     e: "الشرق",
     se: "الجنوب الشرقي",
     s: "الجنوب",
     sw: "الجنوب الغربي",
     w: "الغرب",
     nw: "الشمال الغربي"
   }
  },
  calendar: {
    title: "التقويم",
    hijriYearSuffix: "هـ",
    today: "اليوم",
    prevMonth: "الشهر السابق",
    nextMonth: "الشهر التالي",
    significantDatesTitle: "المناسبات المهمة هذا الشهر",
    dates: {
      ashura: "عاشوراء",
      mawlid: "المولد النبوي",
      isra: "الإسراء والمعراج",
      baraat: "ليلة البراءة",
      ramadanStart: "بداية رمضان",
      laylatAlQadr: "ليلة القدر (تقديريًا)",
      eidFitr: "عيد الفطر",
      dayOfArafah: "يوم عرفة",
      eidAdha: "عيد الأضحى"
    }
  },
  quickLinks: {
    calendar: "التقويم الهجري",
    stats: "الإحصائيات"
  },
  profile: {
     quickLinksLabel: "الأقسام",
     settingsLabel: "الإعدادات"
   },
  stats: {
    title: "الإحصائيات",
    streakTitle: "أيام متتالية",
    streakDayOne: "يوم",
    streakDays: "أيام",
    rangeWeek: "الأسبوع",
    rangeMonth: "الشهر",
    percentLabel: "مكتمل",
    doneLabel: "تم",
    missedLabel: "فائتة"
  },
  calculationMethods: {
    muslimWorldLeague: "رابطة العالم الإسلامي",
    egyptian: "الهيئة المصرية العامة للمساحة",
    karachi: "كراتشي",
    ummAlQura: "أم القرى (مكة)",
    dubai: "دبي",
    moonsightingCommittee: "لجنة رؤية الهلال",
    northAmerica: "ISNA (أمريكا الشمالية)",
    kuwait: "الكويت",
    qatar: "قطر",
    singapore: "سنغافورة",
    tehran: "طهران",
    turkey: "تركيا (ديانت)"
  },
  onboarding: {
    slide1Title: "مرحبًا بك في سكينة",
    slide1Text: "رفيقك الرقمي الهادئ للعبادة اليومية",
    slide2Title: "أوقات الصلاة والقبلة",
    slide2Text: "حساب دقيق بناءً على موقعك واتجاه الكعبة",
    slide3Title: "القرآن والأذكار",
    slide3Text: "وصول سريع إلى مصادر موثوقة للقراءة والذكر",
    slide4Title: "لنبدأ",
    slide4Text: "اسمح بالوصول إلى الموقع في الخطوة التالية للحصول على أوقات صلاة دقيقة",
    next: "التالي",
    start: "ابدأ",
    skip: "تخطي"
  }
}