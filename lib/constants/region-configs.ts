import { CalculationMethod, CalculationParameters } from "adhan"

export type RegionId = "dagestan" | "chechnya" | "ingushetia"

export interface RegionConfig {
  id: RegionId
  name: string
  getParams: () => CalculationParameters
}

export const regionConfigs: Record<RegionId, RegionConfig> = {
  dagestan: {
    id: "dagestan",
    name: "Дагестан",
    getParams: () => {
      const params = CalculationMethod.MuslimWorldLeague()
      params.adjustments = {
        fajr: 4,
        sunrise: -3,
        dhuhr: 4,
        asr: 3,
        maghrib: 5,
        isha: -13
      }
      return params
    }
  },
  chechnya: {
    id: "chechnya",
    name: "Чеченская Республика",
    getParams: () => {
      const params = CalculationMethod.MuslimWorldLeague()
      params.adjustments = { 
        fajr: 19, 
        sunrise: -23, 
        dhuhr: -41, 
        asr: -42, 
        maghrib: -54, 
        isha: -93 
      }
      return params
    }
  },
  ingushetia: {
    id: "ingushetia",
    name: "Республика Ингушетия",
    getParams: () => {
      const params = CalculationMethod.MuslimWorldLeague()
      params.adjustments = { 
        fajr: 13, 
        sunrise: 0, 
        dhuhr: -1, 
        asr: 1, 
        maghrib: 0, 
        isha: -12 
      }
      return params
    }
  }
}