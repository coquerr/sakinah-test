import { Dictionary } from "../types"

export const en: Dictionary = {
  common: {
    appName: "Sakinah"
  },
  nav: {
    home: "Home",
    quran: "Quran",
    azkar: "Azkar",
    qibla: "Qibla",
    profile: "Profile"
  },
  settings: {
    languageTitle: "Interface language",
    location: {
      title: "Location",
      currentPrefix: "Current city",
      notSelected: "No city selected",
      placeholder: "Enter a city",
      searching: "Searching..."
    },
    method: {
      title: "Calculation method"
    }
  },
  account: {
    title: "Аккаунт",
    subtitle: "Войдите, чтобы синхронизировать настройки между устройствами",
    emailPlaceholder: "Ваш email",
    sendLink: "Отправить ссылку для входа",
    synced: "Synced",
    sending: "Отправка...",
    linkSent: "Ссылка отправлена. Проверьте почту.",
    error: "Не удалось отправить ссылку. Попробуйте снова.",
    signOut: "Выйти"
  },
  greeting: {
    morning: "Good morning",
    afternoon: "Good afternoon",
    evening: "Good evening",
    night: "Good night"
  },
  prayer: {
    fajr: "Fajr",
    sunrise: "Sunrise",
    dhuhr: "Dhuhr",
    asr: "Asr",
    maghrib: "Maghrib",
    isha: "Isha",
    next: "Next prayer",
    at: "at",
    in: "in",
    tracker: {
      title: "Today's prayer tracker",
      markDone: "Mark as done",
      markMissed: "Mark as missed"
    }
  },
    home: {
    quickActions: {
      qibla: "Qibla",
      allPrayers: "All prayers",
      azkar: "Azkar"
    }
  },
    quran: {
    title: "Quran",
    surahsCount: "surahs",
    readOnPrefix: "Read on",
    ayahs: "ayahs",
    meccan: "Meccan",
    medinan: "Medinan",
    openOnPrefix: "Open on",
    noResults: "No results found",
    searchPlaceholder: "Surah, number, or Ya-Sin",
    clearSearch: "Clear search",
    popularLabel: "Popular:",
    all: "All",
    recentTitle: "Recently opened",
    surahPrefix: "Surah",
    openButton: "Open"
  },
    azkar: {
    title: "Azkar and Duas",
    subtitle: "A collection of remembrances and supplications",
    sourceNotice: "Texts open on Sunnah.com",
    openOnPrefix: "Open on",
        searchPlaceholder: "Find an azkar or dua...",
    clearSearch: "Clear search",
    noResults: "No results found",
        quickLabels: {
      morning: "Morning",
      evening: "Evening",
      sleep: "Sleep",
      home: "Home",
      protection: "Protection"
    },
        tabs: {
      all: "All",
      favorites: "Favorites"
    },
    emptyFavoritesTitle: "You haven't saved anything yet",
    emptyFavoritesText: "Tap ♡ on a category to add it here.",
        groups: {
      daily: "Daily",
      everyday: "Everyday situations",
      special: "Special occasions"
    },
        now: {
      morningTitle: "It's morning",
      morningText: "Don't forget your morning azkar",
      eveningTitle: "It's evening",
      eveningText: "Time for evening azkar",
      openLabel: "Open"
    }
  },
  qibla: {
    subtitle: "Direction to the Kaaba from your location",
    north: "N",
    east: "E",
    south: "S",
    west: "W",
    fromNorth: "from north",
    enableCompass: "Allow compass access",
    accuracyHigh: "High accuracy",
   accuracyMedium: "Medium accuracy",
   accuracyLow: "Low accuracy",
   accuracyUnknown: "Accuracy unavailable",
   calibrationHint: "Rotate your phone a few times to calibrate",
   calibrateButton: "Calibrate",
   calibrateInstructions: "Move your phone in a figure-eight motion to calibrate the compass sensor.",
   aligned: "You are facing the Qibla",
    unsupported: "Your device does not support the orientation sensor. The arrow shows the bearing relative to north.",
    distanceLabel: "Distance to the Kaaba",
   distanceCity: "Mecca, Saudi Arabia",
   directions: {
     n: "North",
     ne: "Northeast",
     e: "East",
     se: "Southeast",
     s: "South",
     sw: "Southwest",
     w: "West",
     nw: "Northwest"
   }
  },
  calendar: {
    title: "Calendar",
    hijriYearSuffix: "AH",
    today: "Today",
    prevMonth: "Previous month",
    nextMonth: "Next month",
    currentMonthLabel: "Current month",
    significantDatesTitle: "Significant dates this month",
    jumpToTodayLabel: "Jump to today",
    dates: {
      ashura: "Ashura",
      mawlid: "Mawlid an-Nabi",
      isra: "Isra and Mi'raj",
      baraat: "Night of Baraat",
      ramadanStart: "Start of Ramadan",
      laylatAlQadr: "Laylat al-Qadr (estimated)",
      eidFitr: "Eid al-Fitr",
      dayOfArafah: "Day of Arafah",
      eidAdha: "Eid al-Adha"
    }
  },
  quickLinks: {
    calendar: "Islamic calendar",
    stats: "Statistics"
  },
    profile: {
    quickLinksLabel: "Sections",
    settingsLabel: "Settings",
    greeting: "Assalamu alaikum",
    todayLabel: "Today",
    prayersLabel: "prayers completed",
    dailyGoalSuffix: "of daily goal",
    streakLabel: "Streak",
    streakSubtitle: "Prayers tracked every day",
    trackerStatus: {
      done: "Done",
      missed: "Missed",
      pending: "Not marked"
    },
    appearanceTitle: "Appearance",
    appearanceSystem: "System",
    appearanceDark: "Dark",
    privacyTitle: "Privacy",
    privacyText: "Data is stored locally on your device"
  },
  privacyBanner: {
    text: "Sakinah stores your settings locally on this device. Nothing is sent to a server.",
    dismiss: "Got it"
  },
  stats: {
    title: "Statistics",
    streakTitle: "Day streak",
    streakDayOne: "day",
    streakDays: "days",
    rangeWeek: "Week",
    rangeMonth: "Month",
    percentLabel: "Completed",
    doneLabel: "Done",
    missedLabel: "Missed",
    notMarkedLabel: "Not marked",
    totalLabel: "Total",
    completionLabel: "Completion",
    completedLabel: "Prayers completed",
    byPrayerTitle: "Completion by prayer",
    bestDayTitle: "Best day",
    averageTitle: "Daily average",
    prayersUnit: "prayers",
    heatmapHint: "Brighter means more prayers completed that day"
  },
  calculationMethods: {
    muslimWorldLeague: "Muslim World League",
    egyptian: "Egyptian General Authority",
    karachi: "Karachi",
    ummAlQura: "Umm al-Qura (Mecca)",
    dubai: "Dubai",
    moonsightingCommittee: "Moonsighting Committee",
    northAmerica: "ISNA (North America)",
    kuwait: "Kuwait",
    qatar: "Qatar",
    singapore: "Singapore",
    tehran: "Tehran",
    turkey: "Turkey (Diyanet)"
  },
  onboarding: {
    slide1Title: "Welcome to Sakinah",
    slide1Text: "A quiet digital companion for daily worship",
    slide2Title: "Prayer times and Qibla",
    slide2Text: "Accurate calculation based on your location and direction to the Kaaba",
    slide3Title: "Quran and Azkar",
    slide3Text: "Quick access to trusted sources for reading and remembrance",
    slide4Title: "Let's get started",
    slide4Text: "Allow location access on the next step for accurate prayer times",
    next: "Next",
    start: "Get started",
    skip: "Skip"
  }
}