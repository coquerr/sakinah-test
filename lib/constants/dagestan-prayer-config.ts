import { CalculationMethod } from "adhan"

export function getDagestanCalculationParams() {
  const params = CalculationMethod.MuslimWorldLeague()

  params.adjustments = {
    fajr: 3,     // Было 4, отняли 1 минуту
    sunrise: -3, // Без изменений
    dhuhr: 3,    // Было 4, отняли 1 минуту
    asr: 3,      // Без изменений
    maghrib: 5,  // Без изменений
    isha: -9     // Было -11, добавили 2 минуты
  }

  return params
}
