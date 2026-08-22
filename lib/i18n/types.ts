import { LucideIcon } from "lucide-react"

export interface Dictionary {
  common: {
    appName: string
  }
  nav: {
    home: string
    quran: string
    azkar: string
    qibla: string
    profile: string
  }
    quran: {
    title: string
    surahsCount: string
    readOnPrefix: string
    ayahs: string
    meccan: string
    medinan: string
    openOnPrefix: string
    noResults: string
    searchPlaceholder: string
    clearSearch: string
    popularLabel: string
    all: string
    recentTitle: string
    surahPrefix: string
    openButton: string
  }
  azkar: {
    title: string
    subtitle: string
    sourceNotice: string
    openOnPrefix: string
    searchPlaceholder: string
    clearSearch: string
    noResults: string
    groups: {
      daily: string
      everyday: string
      special: string
    }
    quickLabels: {
      morning: string
      evening: string
      sleep: string
      home: string
      protection: string
    }
    tabs: {
      all: string
      favorites: string
    }
    emptyFavoritesTitle: string
    emptyFavoritesText: string
    now: {
      morningTitle: string
      morningText: string
      eveningTitle: string
      eveningText: string
      openLabel: string
    }
  }
  settings: {
    languageTitle: string
    location: {
      title: string
      currentPrefix: string
      notSelected: string
      placeholder: string
      searching: string
    }
    method: {
      title: string
    }
  }
  account: {
    title: string
    subtitle: string
    emailPlaceholder: string
    synced: string
    sendLink: string
    sending: string
    linkSent: string
    error: string
    signOut: string
  }
  greeting: {
    morning: string
    afternoon: string
    evening: string
    night: string
  }
    prayer: {
    fajr: string
    sunrise: string
    dhuhr: string
    asr: string
    maghrib: string
    isha: string
    next: string
    at: string
    in: string
    tracker: {
      title: string
      markDone: string
      markMissed: string
    }
  }
  home: {
  quickActions: {
    qibla: string
    allPrayers: string
    azkar: string
    }
  }
  qibla: {
    subtitle: string
    north: string
    east: string
    south: string
    west: string
    fromNorth: string
    enableCompass: string
    unsupported: string
    distanceLabel: string
    distanceCity: string
    directions: {
      n: string
      ne: string
      e: string
      se: string
      s: string
      sw: string
      w: string
      nw: string
    }
    accuracyHigh: string
    accuracyMedium: string
    accuracyLow: string
    accuracyUnknown: string
    calibrationHint: string
    calibrateButton: string
    calibrateInstructions: string
    aligned: string
  }
  calendar: {
    title: string
    hijriYearSuffix: string
    today: string
    prevMonth: string
    nextMonth: string
    significantDatesTitle: string
    currentMonthLabel: string
    jumpToTodayLabel: string
    dates: {
      ashura: string
      mawlid: string
      isra: string
      baraat: string
      ramadanStart: string
      laylatAlQadr: string
      eidFitr: string
      dayOfArafah: string
      eidAdha: string
    }
  }
  quickLinks: {
    calendar: string
    stats: string
  }
    profile: {
    quickLinksLabel: string
    settingsLabel: string
    greeting: string
    todayLabel: string
    prayersLabel: string
    dailyGoalSuffix: string
    streakLabel: string
    streakSubtitle: string
    trackerStatus: {
      done: string
      missed: string
      pending: string
    }
    appearanceTitle: string
    appearanceSystem: string
    appearanceDark: string
    privacyTitle: string
    privacyText: string
  }
  stats: {
    title: string
    streakTitle: string
    streakDayOne: string
    streakDays: string
    rangeWeek: string
    rangeMonth: string
    percentLabel: string
    doneLabel: string
    missedLabel: string
    notMarkedLabel: string
    totalLabel: string
    completionLabel: string
    completedLabel: string
    byPrayerTitle: string
    bestDayTitle: string
    averageTitle: string
    prayersUnit: string
    heatmapHint: string
  }
  calculationMethods: {
    muslimWorldLeague: string
    egyptian: string
    karachi: string
    ummAlQura: string
    dubai: string
    moonsightingCommittee: string
    northAmerica: string
    kuwait: string
    qatar: string
    singapore: string
    tehran: string
    turkey: string
  }
  onboarding: {
    slide1Title: string
    slide1Text: string
    slide2Title: string
    slide2Text: string
    slide3Title: string
    slide3Text: string
    slide4Title: string
    slide4Text: string
    next: string
    start: string
    skip: string
  }
}

type Join<K, P> = K extends string
  ? P extends string
    ? `${K}.${P}`
    : never
  : never

type Paths<T> = T extends object
  ? { [K in keyof T]: T[K] extends object ? Join<K, Paths<T[K]>> : K }[keyof T]
  : never

export type TranslationKey = Paths<Dictionary>