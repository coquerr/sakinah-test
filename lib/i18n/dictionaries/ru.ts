import { Dictionary } from "../types"

export const ru: Dictionary = {
  common: {
    appName: "Sakinah"
  },
  nav: {
    home: "Главная",
    quran: "Коран",
    azkar: "Азкары",
    qibla: "Кибла",
    profile: "Профиль"
  },
  settings: {
    languageTitle: "Язык интерфейса",
    location: {
      title: "Местоположение",
      currentPrefix: "Текущий город",
      notSelected: "Город не выбран",
      placeholder: "Введите город",
      searching: "Поиск..."
    },
    method: {
      title: "Метод расчёта"
    }
  },
  account: {
    title: "Аккаунт",
    subtitle: "Войдите, чтобы синхронизировать настройки между устройствами",
    emailPlaceholder: "Ваш email",
    synced: "Синхронизировано",
    sendLink: "Отправить ссылку для входа",
    sending: "Отправка...",
    linkSent: "Ссылка отправлена. Проверьте почту.",
    error: "Не удалось отправить ссылку. Попробуйте снова.",
    signOut: "Выйти"
  },
  greeting: {
    morning: "Доброе утро",
    afternoon: "Добрый день",
    evening: "Добрый вечер",
    night: "Спокойной ночи"
  },
  prayer: {
    fajr: "Фаджр",
    sunrise: "Восход",
    dhuhr: "Зухр",
    asr: "Аср",
    maghrib: "Магриб",
    isha: "Иша",
    next: "Следующий намаз",
    at: "в",
    in: "через",
    tracker: {
      title: "Трекер намазов сегодня",
      markDone: "Отметить выполненным",
      markMissed: "Отметить пропущенным"
    }
  },
    home: {
    quickActions: {
      qibla: "Кибла",
      allPrayers: "Все намазы",
      azkar: "Азкары"
    }
  },
    quran: {
    title: "Коран",
    surahsCount: "сур",
    readOnPrefix: "Читать на",
    ayahs: "аятов",
    meccan: "Мекканская",
    medinan: "Мединская",
    openOnPrefix: "Открыть на",
    noResults: "Ничего не найдено",
    searchPlaceholder: "Сура, номер или Йа Син",
    clearSearch: "Очистить поиск",
    popularLabel: "Популярные:"
  },
  qibla: {
    subtitle: "Направление на Каабу от вашего местоположения",
    north: "С",
    east: "В",
    south: "Ю",
    west: "З",
    fromNorth: "от севера",
    accuracyHigh: "Точность высокая",
   accuracyMedium: "Точность средняя",
   accuracyLow: "Точность низкая",
   accuracyUnknown: "Точность недоступна",
   calibrationHint: "Поверните телефон несколько раз для калибровки",
   calibrateButton: "Откалибровать",
   calibrateInstructions: "Двигайте телефоном по форме восьмёрки, чтобы откалибровать датчик компаса.",
   aligned: "Вы направлены на Кыблу",
    enableCompass: "Разрешить доступ к компасу",
    unsupported: "Ваше устройство не поддерживает датчик ориентации. Стрелка показывает азимут относительно севера.",
    distanceLabel: "Расстояние до Каабы",
    distanceCity: "Мекка, Саудовская Аравия",
     directions: {
     n: "Север",
     ne: "Северо-восток",
     e: "Восток",
     se: "Юго-восток",
     s: "Юг",
     sw: "Юго-запад",
     w: "Запад",
     nw: "Северо-запад"
   }
  },
  calendar: {
    title: "Календарь",
    hijriYearSuffix: "г.х.",
    today: "Сегодня",
    prevMonth: "Предыдущий месяц",
    nextMonth: "Следующий месяц",
    significantDatesTitle: "Важные даты месяца",
    dates: {
      ashura: "Ашура",
      mawlid: "Маулид ан-Наби",
      isra: "Исра и Мирадж",
      baraat: "Ночь Бараат",
      ramadanStart: "Начало Рамадана",
      laylatAlQadr: "Лейлят аль-Кадр (предположительно)",
      eidFitr: "Ид аль-Фитр",
      dayOfArafah: "День Арафа",
      eidAdha: "Ид аль-Адха"
    }
  },
  quickLinks: {
    calendar: "Исламский календарь",
    stats: "Статистика"
  },
  profile: {
     quickLinksLabel: "Разделы",
     settingsLabel: "Настройки"
   },
  stats: {
    title: "Статистика",
    streakTitle: "Дней подряд",
    streakDayOne: "день",
    streakDays: "дней",
    rangeWeek: "Неделя",
    rangeMonth: "Месяц",
    percentLabel: "Выполнено",
    doneLabel: "Выполнено",
    missedLabel: "Пропущено"
  },
  calculationMethods: {
    muslimWorldLeague: "Muslim World League",
    egyptian: "Египетское управление",
    karachi: "Карачи",
    ummAlQura: "Умм аль-Кура (Мекка)",
    dubai: "Дубай",
    moonsightingCommittee: "Moonsighting Committee",
    northAmerica: "ISNA (Северная Америка)",
    kuwait: "Кувейт",
    qatar: "Катар",
    singapore: "Сингапур",
    tehran: "Тегеран",
    turkey: "Турция (Diyanet)"
  },
  onboarding: {
    slide1Title: "Добро пожаловать в Sakinah",
    slide1Text: "Тихий цифровой спутник для ежедневного поклонения",
    slide2Title: "Время намаза и Кибла",
    slide2Text: "Точный расчёт по вашему местоположению и направление на Каабу",
    slide3Title: "Коран и азкары",
    slide3Text: "Быстрый доступ к проверенным источникам для чтения и поминаний",
    slide4Title: "Начнём",
    slide4Text: "Разрешите доступ к геолокации на следующем шаге для точных времён намаза",
    next: "Далее",
    start: "Начать",
    skip: "Пропустить"
  }
}