import { Qibla } from "adhan"
import { Coordinates } from "adhan"

export function getQiblaDirection(latitude: number, longitude: number): number {
  const coordinates = new Coordinates(latitude, longitude)
  return Qibla(coordinates)
}