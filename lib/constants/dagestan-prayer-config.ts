import { CalculationMethod } from "adhan"

export function getDagestanCalculationParams() {
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