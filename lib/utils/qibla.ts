import { Qibla, Coordinates } from "adhan"

const KAABA_LATITUDE = 21.4225
const KAABA_LONGITUDE = 39.8262
const EARTH_RADIUS_KM = 6371

export function getQiblaDirection(latitude: number, longitude: number): number {
  const coordinates = new Coordinates(latitude, longitude)
  return Qibla(coordinates)
}

export function getDistanceToKaaba(latitude: number, longitude: number): number {
  const toRad = (value: number) => (value * Math.PI) / 180

  const dLat = toRad(KAABA_LATITUDE - latitude)
  const dLon = toRad(KAABA_LONGITUDE - longitude)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(latitude)) *
      Math.cos(toRad(KAABA_LATITUDE)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return EARTH_RADIUS_KM * c
}

export type CompassPoint = "n" | "ne" | "e" | "se" | "s" | "sw" | "w" | "nw"

export function getCompassPoint(degrees: number): CompassPoint {
  const normalized = ((degrees % 360) + 360) % 360
  const points: CompassPoint[] = ["n", "ne", "e", "se", "s", "sw", "w", "nw"]
  const index = Math.round(normalized / 45) % 8
  return points[index]
}